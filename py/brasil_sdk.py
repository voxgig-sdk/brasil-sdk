# Brasil SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import BrasilUtility
from core.spec import BrasilSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import BrasilBaseFeature
from features import _make_feature


class BrasilSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = BrasilUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return BrasilUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = BrasilSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def bank(self):
        """Idiomatic facade: client.bank.list() / client.bank.load({"id": ...})."""
        from entity.bank_entity import BankEntity
        cached = getattr(self, "_bank", None)
        if cached is None:
            cached = BankEntity(self, None)
            self._bank = cached
        return cached

    def Bank(self, data=None):
        # Deprecated: use client.bank instead.
        from entity.bank_entity import BankEntity
        return BankEntity(self, data)


    @property
    def cep(self):
        """Idiomatic facade: client.cep.list() / client.cep.load({"id": ...})."""
        from entity.cep_entity import CepEntity
        cached = getattr(self, "_cep", None)
        if cached is None:
            cached = CepEntity(self, None)
            self._cep = cached
        return cached

    def Cep(self, data=None):
        # Deprecated: use client.cep instead.
        from entity.cep_entity import CepEntity
        return CepEntity(self, data)


    @property
    def cnpj(self):
        """Idiomatic facade: client.cnpj.list() / client.cnpj.load({"id": ...})."""
        from entity.cnpj_entity import CnpjEntity
        cached = getattr(self, "_cnpj", None)
        if cached is None:
            cached = CnpjEntity(self, None)
            self._cnpj = cached
        return cached

    def Cnpj(self, data=None):
        # Deprecated: use client.cnpj instead.
        from entity.cnpj_entity import CnpjEntity
        return CnpjEntity(self, data)


    @property
    def ddd(self):
        """Idiomatic facade: client.ddd.list() / client.ddd.load({"id": ...})."""
        from entity.ddd_entity import DddEntity
        cached = getattr(self, "_ddd", None)
        if cached is None:
            cached = DddEntity(self, None)
            self._ddd = cached
        return cached

    def Ddd(self, data=None):
        # Deprecated: use client.ddd instead.
        from entity.ddd_entity import DddEntity
        return DddEntity(self, data)


    @property
    def feriado(self):
        """Idiomatic facade: client.feriado.list() / client.feriado.load({"id": ...})."""
        from entity.feriado_entity import FeriadoEntity
        cached = getattr(self, "_feriado", None)
        if cached is None:
            cached = FeriadoEntity(self, None)
            self._feriado = cached
        return cached

    def Feriado(self, data=None):
        # Deprecated: use client.feriado instead.
        from entity.feriado_entity import FeriadoEntity
        return FeriadoEntity(self, data)


    @property
    def fipe_marca(self):
        """Idiomatic facade: client.fipe_marca.list() / client.fipe_marca.load({"id": ...})."""
        from entity.fipe_marca_entity import FipeMarcaEntity
        cached = getattr(self, "_fipe_marca", None)
        if cached is None:
            cached = FipeMarcaEntity(self, None)
            self._fipe_marca = cached
        return cached

    def FipeMarca(self, data=None):
        # Deprecated: use client.fipe_marca instead.
        from entity.fipe_marca_entity import FipeMarcaEntity
        return FipeMarcaEntity(self, data)


    @property
    def fipe_preco(self):
        """Idiomatic facade: client.fipe_preco.list() / client.fipe_preco.load({"id": ...})."""
        from entity.fipe_preco_entity import FipePrecoEntity
        cached = getattr(self, "_fipe_preco", None)
        if cached is None:
            cached = FipePrecoEntity(self, None)
            self._fipe_preco = cached
        return cached

    def FipePreco(self, data=None):
        # Deprecated: use client.fipe_preco instead.
        from entity.fipe_preco_entity import FipePrecoEntity
        return FipePrecoEntity(self, data)


    @property
    def municipio(self):
        """Idiomatic facade: client.municipio.list() / client.municipio.load({"id": ...})."""
        from entity.municipio_entity import MunicipioEntity
        cached = getattr(self, "_municipio", None)
        if cached is None:
            cached = MunicipioEntity(self, None)
            self._municipio = cached
        return cached

    def Municipio(self, data=None):
        # Deprecated: use client.municipio instead.
        from entity.municipio_entity import MunicipioEntity
        return MunicipioEntity(self, data)


    @property
    def ufn(self):
        """Idiomatic facade: client.ufn.list() / client.ufn.load({"id": ...})."""
        from entity.ufn_entity import UfnEntity
        cached = getattr(self, "_ufn", None)
        if cached is None:
            cached = UfnEntity(self, None)
            self._ufn = cached
        return cached

    def Ufn(self, data=None):
        # Deprecated: use client.ufn instead.
        from entity.ufn_entity import UfnEntity
        return UfnEntity(self, data)


    @property
    def ufn2(self):
        """Idiomatic facade: client.ufn2.list() / client.ufn2.load({"id": ...})."""
        from entity.ufn2_entity import Ufn2Entity
        cached = getattr(self, "_ufn2", None)
        if cached is None:
            cached = Ufn2Entity(self, None)
            self._ufn2 = cached
        return cached

    def Ufn2(self, data=None):
        # Deprecated: use client.ufn2 instead.
        from entity.ufn2_entity import Ufn2Entity
        return Ufn2Entity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
