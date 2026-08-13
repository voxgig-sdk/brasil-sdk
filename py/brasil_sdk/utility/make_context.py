# Brasil SDK utility: make_context

from brasil_sdk.core.context import BrasilContext


def make_context_util(ctxmap, basectx):
    return BrasilContext(ctxmap, basectx)
