package voxgigbrasilsdk

import (
	"github.com/voxgig-sdk/brasil-sdk/core"
	"github.com/voxgig-sdk/brasil-sdk/entity"
	"github.com/voxgig-sdk/brasil-sdk/feature"
	_ "github.com/voxgig-sdk/brasil-sdk/utility"
)

// Type aliases preserve external API.
type BrasilSDK = core.BrasilSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BrasilEntity = core.BrasilEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BrasilError = core.BrasilError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBankEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewBankEntity(client, entopts)
	}
	core.NewCepEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewCepEntity(client, entopts)
	}
	core.NewCnpjEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewCnpjEntity(client, entopts)
	}
	core.NewDddEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewDddEntity(client, entopts)
	}
	core.NewFeriadoEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewFeriadoEntity(client, entopts)
	}
	core.NewFipeMarcaEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewFipeMarcaEntity(client, entopts)
	}
	core.NewFipePrecoEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewFipePrecoEntity(client, entopts)
	}
	core.NewMunicipioEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewMunicipioEntity(client, entopts)
	}
	core.NewUfnEntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewUfnEntity(client, entopts)
	}
	core.NewUfn2EntityFunc = func(client *core.BrasilSDK, entopts map[string]any) core.BrasilEntity {
		return entity.NewUfn2Entity(client, entopts)
	}
}

// Constructor re-exports.
var NewBrasilSDK = core.NewBrasilSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
