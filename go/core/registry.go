package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBankEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewCepEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewCnpjEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewDddEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewFeriadoEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewFipeMarcaEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewFipePrecoEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewMunicipioEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewUfnEntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

var NewUfn2EntityFunc func(client *BrasilSDK, entopts map[string]any) BrasilEntity

