function initClickyVideo()
{
	//could zoom in closely and auto-move the camera assuming some linearity
	let clickingMode = false
	let startTime = 1.
	
	let mvEndValues = [0.004872107186358113, 0.002165380971714696, 0.02801461632155912, 0.0010826904858573484, 0.04019488428745435, 0.0021653809717146967, 0.052984165651644335, 0, 0.06333739342265536, 0, 0.07490864799025579, 0, 0.08708891595615101, -0.002165380971714696, 0.0980511571254568, -0.0043307619434293934, 0.1084043848964678, -0.0021653809717146967, 0.11936662606577346, -0.0043307619434293934, 0.1297198538367845, -0.005413452429286794, 0.13946406820950066, -0.006496142915144089, 0.14859926918392213, -0.007578833401001489, 0.15590742996345927, -0.0054134524292867945, 0.1644336175395859, -0.00757883340100149, 0.17113276492082835, -0.00757883340100149, 0.17783191230207074, -0.008661523886858893, 0.1833130328867236, -0.008661523886858891, 0.18940316686967126, -0.008661523886858891, 0.19427527405602923, -0.007578833401001489, 0.19792935444579796, -0.00757883340100149, 0.20036540803897693, -0.00649614291514409, 0.2015834348355665, -0.0054134524292867945, 0.2040194884287455, -0.0043307619434293934, 0.2040194884287455, -0.0043307619434293934, 0.20523751522533507, -0.003248071457572098, 0.20523751522533504, 0, 0.2046285018270403, 0.0010826904858573484, 0.2040194884287455, 0.0021653809717146967, 0.20280146163215607, 0.006496142915144143, 0.20097442143727176, 0.00757883340100149, 0.19853836784409273, 0.007578833401001492, 0.1967113276492084, 0.00757883340100149, 0.1930572472594399, 0.00757883340100149, 0.1906211936662607, 0.010826904858573589, 0.18574908647990263, 0.010826904858573589, 0.18209500609013407, 0.011909595344430937, 0.17783191230207074, 0.014074976316145632, 0.1723507917174178, 0.014074976316145633, 0.1686967113276493, 0.012992285830288285, 0.1626065773447017, 0.01624035728786033, 0.15651644336175402, 0.01624035728786033, 0.15042630937880636, 0.01515766680200298, 0.14555420219244825, 0.01515766680200298, 0.13946406820950072, 0.01515766680200298, 0.13337393422655305, 0.016240357287860326, 0.12545676004872117, 0.016240357287860333, 0.11997563946406824, 0.01515766680200298, 0.11205846528623636, 0.01515766680200298, 0.10414129110840448, 0.01515766680200298, 0.09744214372716202, 0.014074976316145633, 0.09074299634591969, 0.01515766680200298, 0.08404384896467723, 0.01624035728786033, 0.0749086479902558, 0.01515766680200298, 0.06820950060901344, 0.016240357287860326, 0.05846528623629723, 0.01624035728786033, 0.05176613885505481, 0.017323047773717678, 0.04323995127892812, 0.018405738259575085, 0.035931790499391006, 0.020571119231289774, 0.02984165651644334, 0.019488428745432426, 0.020706455542021895, 0.019488428745432426, 0.015834348355663785, 0.021653809717147122, 0.007308160779537115, 0.022736500203004474, 0, 0.025984571660576567, -0.00669914738124239, 0.02381919068886182, -0.01400730816077956, 0.023819190688861815, -0.021315468940316672, 0.022736500203004474, -0.026796589524969563, 0.022736500203004474, -0.037149817295980506, 0.024901881174719167, -0.03836784409257006, 0.024901881174719167, -0.04384896467722291, 0.023819190688861815, -0.04993909866017056, 0.02381919068886182, -0.05785627283800246, 0.02381919068886182, -0.06577344701583442, 0.02706726214643392, -0.07125456760048725, 0.02598457166057657, -0.07612667478684536, 0.02598457166057657, -0.08221680876979295, 0.023819190688861815, -0.08647990255785631, 0.022736500203004474, -0.08952496954933013, 0.022736500203004474, -0.0931790499390987, 0.021653809717147126, -0.1029232643118149, 0.020571119231289774, -0.1047503045066992, 0.020571119231289774, -0.1047503045066992, 0.020571119231289774, -0.10718635809987825, 0.019488428745432426, -0.10718635809987825, 0.016240357287860326, -0.1096224116930573, 0.01624035728786033, -0.11144945188794159, 0.011909595344430939, -0.11144945188794159, 0.009744214372716189, -0.11266747868453113, 0.008661523886858837, -0.11144945188794159, 0.009744214372716189, -0.1102314250913521, 0.006496142915144144, -0.10840438489646774, 0.003248071457572045, -0.10779537149817302, 0.004330761943429446, -0.10596833130328877, 0.0054134524292867945, -0.1047503045066992, 0.004330761943429446, -0.10231425091352014, 0.0043307619434294455, -0.0986601705237516, 0.003248071457572045, -0.09744214372716202, 0.002165380971714696, -0.09378806333739347, -0.002165380971714696, -0.09074299634591963, -0.0021653809717146967, -0.0864799025578563, -0.0010826904858574015, -0.08221680876979297, -0.0032480714575720986, -0.07673568818514012, -0.0010826904858574015, -0.07003654080389773, -0.0021653809717146967, -0.06638246041412912, -0.0032480714575720978, -0.06029232643118152, -0.0021653809717146967, -0.05481120584652863, -0.00649614291514409, -0.04689403166869673, -0.0043307619434293934, -0.03958587088915957, -0.0054134524292867945, -0.029232643118148615, -0.00649614291514409, -0.019488428745432395, -0.0054134524292867945, -0.012789281364190002, -0.0043307619434293934, -0.004872107186358113, -0.002165380971714696, 0.004263093788063335, -0.0021653809717146967, 0.01400730816077956, 0, 0.022533495736906228, 0.003248071457572045, 0.03227771010962246, 0.00757883340100149, 0.04202192448233868, 0.01515766680200298, 0.05176613885505479, 0.019488428745432423, 0.06090133982947623, 0.02490188117471917, 0.06881851400730825, 0.031398024089863315, 0.07551766138855058, 0.0368114765191501, 0.08221680876979302, 0.040059547976722204, 0.08830694275274059, 0.04547300040600894, 0.09013398294762491, 0.04872107186358105, 0.10170523751522534, 0.07145757206658551, 0.1157125456760049, 0.08011909595344435, 0.12606577344701592, 0.10069021518473413, 0.1291108404384897, 0.10610366761402092, 0.1352009744214374, 0.11259981052916507, 0.13459196102314258, 0.12017864393016657, 0.13337393422655305, 0.12342671538773861, 0.13337393422655305, 0.12992285830288272, 0.12911084043848972, 0.14074976316145632, 0.12241169305724735, 0.14616321559074305, 0.11449451887941536, 0.16132088239274606, 0.10109622411693057, 0.1678170253078902, 0.08708891595615101, 0.17431316822303436, 0.07734470158343491, 0.1786439301664638, 0.04141291108404341, 0.1948842874543218, 0.028014616321558782, 0.20029773988360847, -0.003654080389768513, 0.20895926377046725, -0.022533495736905957, 0.21004195425632455, 0.0006090133982947708, 0.21004195425632458, 0.026187576126674474, 0.21004195425632458, 0.05054811205846474, 0.20354581134118047, 0.07003654080389685, 0.20138043036946582, 0.08952496954932908, 0.20138043036946582, 0.08404384896467625, 0.20246312085532314, 0.061510353227770286, 0.21004195425632455, 0.028623629719853563, 0.21762078765732593, 0, 0.2230342400866127, -0.027405602923264015, 0.21870347814318325, 0.028623629719853563, 0.20679388279875252, 0.05542021924482281, 0.20029773988360847, 0.08160779537149727, 0.2013804303694658, 0.09561510353227667, 0.20679388279875258, 0.08404384896467625, 0.2111246447421819, 0.0609013398294755, 0.21978616862904063, 0.029232643118148216, 0.2262823115441847, 0.001827040194884312, 0.2306130734876141, -0.02314250913520073, 0.2251996210583274, 0.006090133982947596, 0.21978616862904066, 0.04933008526187521, 0.20571119231289525, 0.08038976857490772, 0.21437271619975393, 0.06394640682094936, 0.21870347814318328, 0.030450669914737754, 0.22303424008661268, -0.0018270401948842566, 0.2316957639734714, -0.026187576126674477, 0.23602652591690082, 0.009135200974421338, 0.2273650020300421, 0.038367844092569554, 0.2230342400866127, 0.06638246041412835, 0.2143727161997539, 0.08708891595614998, 0.21220733522803922, 0.06272838002435983, 0.22411693057247004, 0.026796589524969244, 0.23494383543104347, 0.0036540803897685136, 0.2381919068886155, -0.0060901339829475395, 0.22411693057247, 0.02131546894031642, 0.2197861686290407, 0.04993909866016997, 0.21870347814318325, 0.0712545676004864, 0.21762078765732595, 0.08465286236297102, 0.21545540668561125, 0.0609013398294755, 0.22736500203004206, 0.015834348355663594, 0.23061307348761406, -0.015225334957368879, 0.24035728786033017, -0.008526187576126568, 0.2262823115441847, 0.014007308160779393, 0.2306130734876141, 0.04141291108404341, 0.22411693057247006, 0.06455542021924415, 0.2197861686290407, 0.0809987819732025, 0.2176207876573259, 0.07247259439707593, 0.22628231154418466, 0.049330085261875205, 0.23277845445932877, 0.030450669914737754, 0.2316957639734714, 0.010962241169305654, 0.23386114494518617, -0.018879415347137447, 0.22844769251589944, -0.0006090133982947708, 0.21870347814318325, 0.029841656516442983, 0.21220733522803922, 0.0651644336175388, 0.2132900257138966, 0.09196102314250805, 0.21545540668561125, 0.05846528623629654, 0.23386114494518614, 0.05115712545675952, 0.2230342400866127, 0.07247259439707593, 0.21220733522803922, 0.09135200974421337, 0.2111246447421819, 0.06760048721071789, 0.22086885911489804, 0.05602923264311746, 0.2230342400866127, 0.029841656516442983, 0.23169576397347139, 0.009135200974421338, 0.2273650020300421, -0.009744214372716109, 0.2230342400866127, -0.024969549330084984, 0.22303424008661268, -0.026796589524969244, 0.22303424008661268, -0.02375152253349545, 0.22519962105832736, -0.012789281364189853, 0.22086885911489804, 0.0006090133982947708, 0.2230342400866127, 0.02131546894031642, 0.21220733522803922, 0.04263093788063284, 0.20029773988360847, 0.0633373934226546, 0.19163621599674976, 0.08221680876979205, 0.1818920016240336, 0.09987819732033995, 0.17431316822303222, 0.11388550548111927, 0.16673433482203082, 0.12180267965895111, 0.16132088239274409, 0.1266747868453092, 0.15265935850588538, 0.12971985383678292, 0.14724590607659863, 0.13215590742996192, 0.14074976316145457, 0.13154689403166722, 0.13208823927459581, 0.1285018270401934, 0.1277574773311665, 0.12971985383678292, 0.11909595344430776, 0.1266747868453092, 0.10610366761401964, 0.12180267965895115, 0.10610366761401964, 0.11936662606577207, 0.09960752469887557, 0.11266747868452981, 0.0963594532413035, 0.11327649208282459, 0.08986331032615945, 0.1065773447015822, 0.07903640546758604, 0.10475030450669802, 0.06820950060901261, 0.0986601705237504, 0.06387873866558325, 0.09866017052375042, 0.055217214778724516, 0.09378806333739237, 0.05413452429286717, 0.09013398294762383, 0.05088645283529511, 0.08587088915956057, 0.04655569089186573, 0.07978075517661296, 0.04222492894843639, 0.07612667478684446, 0.038976857490864325, 0.07247259439707593, 0.03248071457572031, 0.06760048721071789, 0.03356340506157765, 0.06577344701583357, 0.03356340506157765, 0.059074299634591314, 0.02923264311814826, 0.06029232643118074, 0.028149952632290923
]
	let mvOriginValues = [0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04445797807551715, 0.3919339558803583, 0.04506699147381192, 0.3897685749086436, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04445797807551715, 0.3886858844227863, 0.04506699147381192, 0.38760319393692894, 0.04506699147381193, 0.3886858844227863, 0.04506699147381192, 0.39085126539450094, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04506699147381193, 0.3886858844227863, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04506699147381193, 0.3886858844227863, 0.04445797807551715, 0.38976857490864364, 0.04445797807551715, 0.38976857490864364, 0.04506699147381192, 0.38760319393692894, 0.04323995127892761, 0.38760319393692894, 0.04384896467722237, 0.3876031939369288, 0.04445797807551715, 0.3876031939369288, 0.04567600487210669, 0.3865205034510716, 0.04567600487210669, 0.3865205034510716, 0.04506699147381192, 0.3854378129652142, 0.04384896467722237, 0.3876031939369288, 0.04506699147381192, 0.38760319393692894, 0.04445797807551715, 0.38435512247935677, 0.04445797807551715, 0.38435512247935677, 0.04445797807551715, 0.38435512247935677, 0.04445797807551715, 0.38435512247935677, 0.04445797807551714, 0.3854378129652141, 0.045066991473811914, 0.3865205034510716, 0.045066991473811914, 0.3865205034510716, 0.04323995127892761, 0.3854378129652141, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04323995127892761, 0.38760319393692894, 0.04323995127892761, 0.3854378129652141, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3876031939369288, 0.04323995127892761, 0.38760319393692894, 0.042630937880632845, 0.3876031939369288, 0.04202192448233818, 0.3865205034510716, 0.04202192448233818, 0.3865205034510716, 0.04202192448233818, 0.3865205034510716, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233818, 0.3876031939369288, 0.04202192448233817, 0.3843551224793567, 0.04202192448233817, 0.3843551224793567, 0.04202192448233817, 0.3843551224793567, 0.04202192448233817, 0.3843551224793567, 0.04202192448233817, 0.3843551224793567, 0.04202192448233817, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.04141291108404341, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.042630937880632845, 0.3854378129652142, 0.040803897685748644, 0.3832724319934995, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04080389768574864, 0.3843551224793567, 0.04263093788063284, 0.3865205034510716, 0.04263093788063284, 0.3865205034510716, 0.04263093788063284, 0.3865205034510716, 0.04263093788063284, 0.3865205034510716, 0.04323995127892761, 0.3854378129652141, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04323995127892761, 0.3865205034510716, 0.04263093788063284, 0.3865205034510716, 0.04263093788063284, 0.3865205034510716, 0.04323995127892761, 0.3854378129652141, 0.04141291108404341, 0.3854378129652142, 0.04202192448233818, 0.3865205034510716, 0.04202192448233818, 0.3865205034510716, 0.042630937880632845, 0.3876031939369288, 0.042630937880632845, 0.3876031939369288, 0.042630937880632845, 0.3876031939369288, 0.042630937880632845, 0.3876031939369288, 0.04384896467722238, 0.38868588442278623, 0.04384896467722238, 0.38868588442278623, 0.04384896467722238, 0.38868588442278623, 0.04323995127892761, 0.38760319393692894, 0.04323995127892761, 0.38760319393692894, 0.04445797807551715, 0.3886858844227863, 0.04445797807551715, 0.3886858844227863, 0.04445797807551715, 0.3886858844227863, 0.04445797807551715, 0.3886858844227863, 0.04384896467722238, 0.38868588442278623, 0.04384896467722238, 0.38868588442278623, 0.04384896467722238, 0.38868588442278623, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288, 0.04384896467722237, 0.3876031939369288
]
	let shorter = mvOriginValues.length < mvEndValues.length ? mvOriginValues : mvEndValues
	let longer =  mvOriginValues.length > mvEndValues.length ? mvOriginValues : mvEndValues
	for (let i = shorter.length/2, il = longer.length/2; i < il; i++)
	{
		shorter[i * 2 + 0] = shorter[i * 2 - 2]
		shorter[i * 2 + 1] = shorter[i * 2 - 1]
	}
	let arrayBeingWorkedOn = mvEndValues

	let mv = new THREE.Mesh(VectorGeometry("r"), new THREE.MeshStandardMaterial({ vertexColors: THREE.FaceColors }))
	mv.matrixAutoUpdate = false
	// mv.material.transparent = true
	// mv.material.opacity = .5

	let videosAndVector = new THREE.Group()
	videosAndVector.add(mv)
	scene.add(videosAndVector)

	function setMvFromVid(video)
	{
		let currentFramesFromStartTime = Math.round( (video.$.currentTime - startTime) * 29.97) //floor?
		currentFramesFromStartTime = Math.min(Math.floor((mvOriginValues.length - 1) / 2.), currentFramesFromStartTime)
		if (!(currentFramesFromStartTime >= 0)) return

		video.updateMatrixWorld()
		v1.set(mvEndValues[currentFramesFromStartTime * 2 + 0] - mvOriginValues[currentFramesFromStartTime * 2 + 0], mvEndValues[currentFramesFromStartTime * 2 + 1] - mvOriginValues[currentFramesFromStartTime * 2 + 1],0.)
		v1.applyMatrix4(video.matrix)
		setRotationallySymmetricMatrix(v1.x, v1.y, 0., mv.matrix)
		v1.set(mvOriginValues[currentFramesFromStartTime * 2 + 0], mvOriginValues[currentFramesFromStartTime * 2 + 1], 0.)
		v1.applyMatrix4(video.matrix)
		mv.matrix.setPosition(v1)
	}
	
	if (!clickingMode)
	{
		let video = VideoScreen("hoberman.mp4")
		video.$.currentTime = startTime
		video.$.play()
		videosAndVector.add(video)

		updateFunctions.push(() =>
		{
			video.scale.x = camera.rightAtZZero * 2.
			if( video.loaded )
				setMvFromVid(video)
		})
	}
	else
	{
		let videos = Array(2)
		for (let i = 0; i < 2; i++)
		{
			videos[i] = VideoScreen("hoberman.mp4")
			videos[i].scale.x = camera.rightAtZZero * 2.
			videos[i].$.paused = true
			videos[i].$.currentTime = startTime
			
			videosAndVector.add(videos[i])
		}

		function advanceSomeFrames(increment)
		{
			numFramesFromStartTime += increment

			//no guarantee the last few parts contain frames?
			let highestFrameAllowed = Math.floor((videos[0].$.duration - startTime) * 29.97) - 1
			if (numFramesFromStartTime > highestFrameAllowed)
				numFramesFromStartTime = highestFrameAllowed

			let indexToGoInScene = numFramesFromStartTime % 2
			videos[1 - indexToGoInScene].position.y = 999.
			videos[    indexToGoInScene].position.y = 0.

			videos[    indexToGoInScene].$.currentTime = startTime + numFramesFromStartTime / 29.97
			videos[1 - indexToGoInScene].$.currentTime = startTime + (numFramesFromStartTime + 1) / 29.97
		}
		let numFramesFromStartTime = -1

		bindButton(" ", () =>
		{
			//could check if there are any gaps, which there might be
			log(arrayBeingWorkedOn.toString())
		})

		updateFunctions.push( () =>
		{
			if (!videos[0].loaded || !videos[1].loaded)
				return
			if(numFramesFromStartTime === -1)
				advanceSomeFrames(1)

			let videoCurrentlyInScene = videos[0].position.y === 0. ? videos[0] : videos[1]
			setMvFromVid(videoCurrentlyInScene)
			videoCurrentlyInScene.scale.x = camera.rightAtZZero * 2.

			if (mouse.clicking && !mouse.oldClicking)
			{
				mouse.getZZeroPosition(v1)
				videoCurrentlyInScene.updateMatrixWorld()
				videoCurrentlyInScene.worldToLocal(v1)
				arrayBeingWorkedOn[numFramesFromStartTime * 2 + 0] = v1.x
				arrayBeingWorkedOn[numFramesFromStartTime * 2 + 1] = v1.y

				advanceSomeFrames(1)
			}
		})

		bindButton("ArrowRight", () => advanceSomeFrames( 1) )
		bindButton("ArrowLeft",  () => advanceSomeFrames(-1) )

		bindButton("PageUp", () => advanceSomeFrames( 50) )
		bindButton("Home",  () => advanceSomeFrames(-50) )
	}
}