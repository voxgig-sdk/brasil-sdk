# Brasil SDK feature factory

from brasil_sdk.feature.base_feature import BrasilBaseFeature
from brasil_sdk.feature.test_feature import BrasilTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BrasilBaseFeature(),
        "test": lambda: BrasilTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
