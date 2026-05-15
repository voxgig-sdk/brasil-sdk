package core

type BrasilError struct {
	IsBrasilError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBrasilError(code string, msg string, ctx *Context) *BrasilError {
	return &BrasilError{
		IsBrasilError: true,
		Sdk:              "Brasil",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BrasilError) Error() string {
	return e.Msg
}
