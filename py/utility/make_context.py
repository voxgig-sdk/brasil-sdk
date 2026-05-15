# Brasil SDK utility: make_context

from core.context import BrasilContext


def make_context_util(ctxmap, basectx):
    return BrasilContext(ctxmap, basectx)
