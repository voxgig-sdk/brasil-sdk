# Brasil SDK feature factory

from brasil_sdk.feature.base_feature import BrasilBaseFeature
from brasil_sdk.feature.ratelimit_feature import BrasilRatelimitFeature
from brasil_sdk.feature.retry_feature import BrasilRetryFeature
from brasil_sdk.feature.test_feature import BrasilTestFeature
from brasil_sdk.feature.timeout_feature import BrasilTimeoutFeature


_FEATURES = {
    "base": lambda: BrasilBaseFeature(),
    "ratelimit": lambda: BrasilRatelimitFeature(),
    "retry": lambda: BrasilRetryFeature(),
    "test": lambda: BrasilTestFeature(),
    "timeout": lambda: BrasilTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
