# ProjectName SDK exists test

import pytest
from brasil_sdk import BrasilSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BrasilSDK.test(None, None)
        assert testsdk is not None
