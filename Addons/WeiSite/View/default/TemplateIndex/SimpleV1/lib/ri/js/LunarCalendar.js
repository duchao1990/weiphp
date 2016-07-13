/**
 * 农历（阴历）万年历
 * LunarCalendar
 * vervison : v0.1.4
 * Github : https://github.com/zzyss86/LunarCalendar
 * HomePage : http://www.tuijs.com/
 * Author : JasonZhou
 * Email : zzyss86@qq.com
 */

(function(){
	var extend = function(o, c){
		if(o && c && typeof c == "object"){
			for(var p in c){
				o[p] = c[p];
			}
		}
		return o;
	};
	
	var creatLenArr = function(year,month,len,start){
		var arr = [];
			start = start || 0;
		if(len<1)return arr;
		var k = start;
		for(var i=0;i<len;i++){
			arr.push({year:year,month:month,day:k});
			k++;
		}
		return arr;
	};
	
	var errorCode = { //错误码列表
		100 : '输入的年份超过了可查询范围，仅支持1891至2100年',
		101 : '参数输入错误，请查阅文档'
	};
	
	var cache = null; //某年相同计算进行cache，以加速计算速度
	var cacheUtil = { //cache管理工具
		current : '',
		setCurrent : function(year){
			if(this.current != year){
				this.current = year;
				this.clear();
			}
		},
		set : function(key,value){
			if(!cache) cache = {};
			cache[key] = value;
			return cache[key];
		},
		get : function(key){
			if(!cache) cache = {};
			return cache[key];
		},
		clear : function(){
			cache = null;
		}
	};
	
	var formateDayD4 = function(month,day){
		month = month+1;
		month = month<10 ? '0'+month : month;
		day = day<10 ? '0'+day : day;
		return 'd'+month+day;
	};
	
	var minYear = 1890;//最小年限
	var maxYear = 2100;//最大年限
	var DATA = {
		heavenlyStems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'], //天干
		earthlyBranches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'], //地支
		zodiac: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'], //对应地支十二生肖
		solarTerm: ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪','冬至'], //二十四节气
		monthCn: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		dateCn: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一']
	};
	
	//中国节日放假安排，外部设置，0无特殊安排，1工作，2放假
	var worktime = {};
	//默认设置2013-2014年放假安排
	worktime.y2013 = {"d0101":2,"d0102":2,"d0103":2,"d0105":1,"d0106":1,"d0209":2,"d0210":2,"d0211":2,"d0212":2,"d0213":2,"d0214":2,"d0215":2,"d0216":1,"d0217":1,"d0404":2,"d0405":2,"d0406":2,"d0407":1,"d0427":1,"d0428":1,"d0429":2,"d0430":2,"d0501":2,"d0608":1,"d0609":1,"d0610":2,"d0611":2,"d0612":2,"d0919":2,"d0920":2,"d0921":2,"d0922":1,"d0929":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1012":1};
	worktime.y2014 = {"d0101":2,"d0126":1,"d0131":2,"d0201":2,"d0202":2,"d0203":2,"d0204":2,"d0205":2,"d0206":2,"d0208":1,"d0405":2,"d0407":2,"d0501":2,"d0502":2,"d0503":2,"d0504":1,"d0602":2,"d0908":2,"d0928":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1011":1};
	
	//公历节日
	var solarFestival = {
		'd0101':'元旦节',
		'd0308':'妇女节',
		'd0312':'植树节 孙中山逝世纪念日',
		'd0501':'劳动节',
		'd0504':'青年节',
		'd0801':'建军节',
		'd0815':'抗日战争胜利纪念',
		'd0927':'世界旅游日',
		'd0928':'孔子诞辰',
		'd1001':'国庆节 世界音乐日 国际老人节',
		'd1006':'老人节',
		'd1224':'平安夜',
		'd1225':'圣诞节',
	};
	
	//农历节日
	var lunarFestival = {
	
'd0101':'春节，本月为斋月！弥勒菩萨圣诞，又地藏斋，天腊，玉帝校世人神气禄命，犯者削禄夺纪，又月朔，犯者夺纪，又十斋日',

'd0103':'万神都会，犯者夺纪，斗降，犯者夺纪',

'd0105':'五虚忌',

'd0106':'定光佛圣诞，又六耗忌，又雷斋日，犯者减寿',

'd0107':'上会日，犯者损寿',

'd0108':'观音斋，又五殿阎罗天子诞，犯者夺纪，又四天王巡行，又十斋日',

'd0109':'帝释天尊（玉皇大帝）圣诞，犯者夺纪',

'd0112':'净宗七祖省常法师圆寂日',

'd0113':'杨公忌',

'd0114':'三元降，犯者减寿又四天王巡行，又十斋日',

'd0115':'元宵节，三元降犯者减寿，又上元神会，犯者夺纪，又月望，犯者夺纪，又四天王巡行，又十斋日',

'd0116':'三元降犯者减寿',

'd0118':'地藏斋，又十斋日',

'd0119':'长春真人诞',

'd0121':'净宗九祖蕅益法师圆寂日',

'd0123':'三尸神奏事，又四天王巡行，又十斋日',

'd0124':'地藏斋，又十斋日',

'd0125':'月晦日犯者减寿，又天地仓开日犯者损寿，子带疾',

'd0127':'斗降犯者夺纪，又若月小则本日为十斋日',

'd0128':'地藏斋，人神在阴犯者得病，宜先一日即戒，又十斋日',

'd0129':'四天王巡行，又十斋日',

'd0130':'月晦、司命奏事犯者减寿（如月小，即戒廿九），又四天王巡行，又十斋日',

'd0201':'地藏斋，一殿秦广王诞，又月朔，犯者夺纪，又十斋日',

'd0202':'万神都会，犯者夺纪，福德土地正神诞，犯者得祸',

'd0203':'文昌帝君诞辰犯者削禄夺纪，斗降犯者夺纪',

'd0206':'东华帝君诞，雷斋日，犯者减寿',

'd0207':'观音斋',

'd0208':'释迦牟尼佛出家，三殿宋帝王诞，张大帝诞，犯者夺纪，四天王巡行，又十斋日',

'd0209':'六祖慧能圣诞，又观音斋',

'd0211':'杨公忌',

'd0214':'四天王巡行，又十斋日',

'd0215':'释迦牟尼佛涅槃，太上老君诞，又月望（即月半），犯者削禄夺纪，四天王巡行，又十斋日',

'd0217':'东方杜将军诞',

'd0218':'地藏斋，四殿五官王诞，至圣先师孔子讳辰，犯者削禄夺纪，又十斋日',

'd0219':'观世音菩萨圣诞，犯者夺纪，又观音斋',

'd0221':'普贤菩萨圣诞',

'd0223':'四天王巡行，又十斋日',

'd0224':'地藏斋，又十斋日',

'd0225':'月晦日犯者减寿',

'd0226':'净宗六祖永明法师圆寂日',

'd0227':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd0228':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd0229':'四天王巡行，又十斋日',

'd0230':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0301':'地藏斋，二殿楚江王诞，又月朔，犯者夺纪，又十斋日',

'd0303':'观音斋，玄天上帝诞，斗降，犯者夺纪',

'd0306':'观音斋，雷斋日，犯者减寿',

'd0308':'六殿卞城王诞，犯者夺纪，四天王巡行，又十斋日',

'd0309':'牛鬼神出，犯者产恶胎，杨公忌',

'd0312':'中央正道诞',

'd0313':'观音斋',

'd0314':'四天王巡行，又十斋日',

'd0315':'昊天上帝诞，玄坛诞，又月望，犯者夺纪，四天王巡行，又十斋日',

'd0316':'准提菩萨圣诞，犯者夺纪',

'd0318':'地藏斋，又十斋日',

'd0319':'中岳大帝诞，后土娘娘诞，三茅降',

'd0320':'天地仓开日，犯者损寿，子孙娘娘诞',

'd0323':'四天王巡行，又十斋日',

'd0324':'地藏斋，又十斋日',

'd0325':'月晦日，犯者减寿',

'd0327':'七殿泰山王诞，斗降，犯者夺纪，又若月小则本日为十斋日',

'd0328':'地藏斋，人神在阴，犯者得病，宜先一日即戒（每月同），苍颉至圣先师诞，犯者削禄夺纪，东岳大帝诞，又十斋日',

'd0329':'四天王巡行，又十斋日',

'd0330':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0401':'地藏斋，八殿都市王诞，又月朔，犯者夺纪，又十斋日',

'd0403':'斗降，犯者夺纪',

'd0404':'文殊菩萨圣诞，又万神善会，犯者失瘼夭胎',

'd0406':'雷斋日，犯者减寿',

'd0407':'南斗、北斗、西斗同降，犯者减寿，杨公忌',

'd0408':'释迦牟尼佛圣诞，犯者夺纪，又万神善会，犯者失瘼夭胎，善恶童子降，犯者血死，九殿平等王诞，四天王巡行，又十斋日',

'd0414':'净宗十一祖省庵法师圆寂日，纯阳祖师诞，犯者减寿，四天王巡行，又十斋日',

'd0415':'月望，犯者夺纪，钟离祖师诞，四天王巡行，又十斋日',

'd0416':'天地仓开日，犯者损寿',

'd0417':'十殿转轮王诞，犯者夺纪',

'd0418':'地藏斋，天地仓开日，紫微大帝诞，犯者减寿，又十斋日',

'd0420':'眼光圣母诞',

'd0422':'观音斋',

'd0423':'四天王巡行，又十斋日',

'd0424':'地藏斋，又十斋日',

'd0425':'月晦日，犯者减寿',

'd0427':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd0428':'药王菩萨圣诞，又地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd0429':'四天王巡行，又十斋日',

'd0430':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0501':'本月为斋月！地藏斋，南极长生大帝诞，又月朔，犯者夺纪，又十斋日',

'd0503':'斗降，犯者夺纪，又观音斋',

'd0505':'端午节，地腊，五帝校定生人官爵，犯者削禄夺纪，九毒日，犯者夭亡，奇祸不测',

'd0506':'九毒日，犯者夭亡，奇祸不测，雷斋日，犯者减寿',

'd0507':'九毒日，犯者夭亡，奇祸不测',

'd0508':'南方五道诞，四天王巡行，又十斋日',

'd0511':'天仓开日，犯者损寿，天下都城隍诞',

'd0512':'炳灵公诞',

'd0513':'伽蓝菩萨圣诞，关圣降，犯者削禄夺纪',

'd0514':'夜子时为天地交泰，犯者三年内夫妇俱亡，四天王巡行，又十斋日',

'd0515':'月望，九毒日，犯者夭亡，奇祸不测，四天王巡行，又十斋日',

'd0516':'九毒日，天地元气造化万物之辰，犯者三年内夫妇俱亡',

'd0517':'观音斋，九毒日，犯者夭亡，奇祸不测',

'd0518':'地藏斋，张天师诞，又十斋日',

'd0522':'孝娥神诞，犯者夺纪',

'd0523':'四天王巡行，又十斋日',

'd0524':'地藏斋，又十斋日',

'd0525':'九毒日，犯者夭亡，奇祸不测，月晦日，犯者减寿',

'd0526':'九毒日，犯者夭亡，奇祸不测',

'd0527':'九毒日，犯者夭亡，奇祸不测，斗降，犯者夺纪，又若月小则本日为十斋日',

'd0528':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd0529':'四天王巡行，又十斋日',

'd0530':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0601':'地藏斋，又月朔，犯者夺纪，又十斋日',

'd0603':'韦驮菩萨圣诞，斗降，犯者夺纪，杨公忌',

'd0605':'南赡部洲转大法轮，犯者损寿',

'd0606':'天地仓开日，雷斋日，犯者损寿',

'd0608':'四天王巡行，又十斋日',

'd0610':'金粟如来诞',

'd0614':'四天王巡行，又十斋日',

'd0615':'月望，犯者夺纪，四天王巡行，又十斋日',

'd0616':'观音斋',

'd0618':'观音斋，又地藏斋，又十斋日',

'd0619':'观世音菩萨成道，又观音斋，犯者夺纪',

'd0623':'观音斋，南方火神诞，犯者遭回禄，四天王巡行，又十斋日',

'd0624':'地藏斋，雷祖诞，关帝诞，犯者削禄夺纪，又十斋日',

'd0625':'月晦日，犯者减寿',

'd0627':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd0628':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd0629':'四天王巡行，又十斋日',

'd0630':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0701':'地藏斋，又月朔，犯者夺纪，杨公忌，又十斋日',

'd0702':'净宗八祖莲池法师圆寂日',

'd0703':'斗降，犯者夺纪',

'd0705':'中会日，犯者损寿，一作初七',

'd0706':'雷斋日，犯者减寿',

'd0707':'道德腊，五帝校生人善恶，魁星诞，犯者削禄夺纪',

'd0708':'四天王巡行，又十斋日',

'd0709':'净宗十祖截流法师圆寂日',

'd0710':'阴毒日',

'd0712':'长真谭真人诞',

'd0713':'大势至菩萨圣诞，犯者减寿，又观音斋',

'd0714':'三元降，犯者减寿，四天王巡行，又十斋日',

'd0715':'佛欢喜日，又月望，三元降，地官校籍，犯者夺纪，四天王巡行，又十斋日',

'd0716':'三元降，犯者减寿',

'd0718':'地藏斋，西王母诞，犯者夺纪，又十斋日',

'd0719':'净宗三祖承远法师圆寂日，太岁诞，犯者夺纪',

'd0721':'普庵祖师圣诞',

'd0722':'增福财神诞，犯者削禄夺纪',

'd0723':'四天王巡行，又十斋日',

'd0724':'龙树菩萨圣诞，又地藏斋，又十斋日',

'd0725':'月晦日，犯者减寿',

'd0727':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd0728':'地藏斋，人神在阴，犯者得病，宜先一日即戒（每月同），又十斋日',

'd0729':'杨公忌，四天王巡行，又十斋日',

'd0730':'地藏王菩萨圣诞，犯者夺纪，月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0801':'地藏斋，又月朔，犯者夺纪，许真君诞，又十斋日',

'd0803':'斗降，北斗诞，犯者夺纪，司命灶君诞，犯者遭回禄',

'd0805':'雷声大帝诞，犯者夺纪',

'd0806':'净宗初祖慧远法师圆寂日，雷斋日，犯者减寿',

'd0808':'四天王巡行，又十斋日',

'd0810':'北斗大帝诞',

'd0812':'西方五道诞',

'd0814':'四天王巡行，又十斋日',

'd0815':'中秋节，记得持斋诵戒！又月望，太明朝元，犯者暴亡，宜焚香守夜，四天王巡行，又十斋日',

'd0816':'观音斋，天曹掠刷真君降，犯者贫夭',

'd0818':'地藏斋，天人兴福之辰，宜斋戒，存想吉事，又十斋日',

'd0822':'燃灯古佛圣诞',

'd0823':'汉恒候张显王诞，四天王巡行，又十斋日',

'd0824':'地藏斋，灶君夫人诞，又十斋日',

'd0825':'月晦日，犯者减寿',

'd0827':'斗降，至圣先师孔子诞，犯者夺纪，杨公忌，又若月小则本日为十斋日',

'd0828':'地藏斋，人神在阴，犯者得病，宜先一日即戒（每月同），四天会事，又十斋日',

'd0829':'四天王巡行，又十斋日',

'd0830':'诸神考校，犯者夺算，月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd0901':'本月为斋月！地藏斋，又月朔，犯者夺纪，南斗诞，犯者削禄夺纪，北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒，又十斋日',

'd0902':'北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0903':'斗降，犯者夺纪，五瘟神诞，北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0904':'北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0905':'北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0906':'雷斋日，犯者减寿，北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0907':'北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0908':'四天王巡行，北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒，又十斋日',

'd0909':'重阳节，斗母诞，犯者削禄夺纪，酆都大帝诞，玄天上帝飞升，北斗九星降世（自初一至初九），犯者夺纪，此九日俱宜斋戒',

'd0910':'斗母降，犯者夺纪',

'd0911':'宜戒',

'd0913':'孟婆尊神诞',

'd0914':'四天王巡行，又十斋日',

'd0915':'月望，犯者夺纪，四天王巡行，又十斋日',

'd0917':'金龙四大王诞，犯者遭水厄',

'd0918':'地藏斋，又十斋日',

'd0919':'观世音菩萨出家，日宫月宫会合，犯者减寿，又观音斋',

'd0923':'观音斋，四天王巡行，又十斋日',

'd0924':'地藏斋，又十斋日',

'd0925':'月晦日，犯者减寿，杨公忌',

'd0927':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd0928':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd0929':'四天王巡行，又十斋日',

'd0930':'药师佛圣诞，犯者危疾，月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd1001':'地藏斋，又月朔，民岁腊，犯者夺纪，四天王降，犯者一年内死，又十斋日',

'd1002':'观音斋',

'd1003':'净宗五祖少康法师圆寂日，斗降，犯者夺纪，三茅诞',

'd1005':'达摩祖师诞辰，下会日，犯者损寿',

'd1006':'雷斋日，犯者减寿，天曹考察，犯者夺纪',

'd1008':'大忌色欲，四天王巡行，又十斋日',

'd1010':'四天王降，犯者一年内死',

'd1011':'宜戒',

'd1014':'三元降，犯者减寿，四天王巡行，又十斋日',

'd1015':'月望，三元降，下元水府校籍，犯者夺纪，四天王巡行，又十斋日',

'd1016':'三元降，犯者减寿',

'd1018':'地藏斋，又十斋日',

'd1023':'四天王巡行，杨公忌，又十斋日',

'd1024':'地藏斋，又十斋日',

'd1025':'月晦日，犯者减寿',

'd1027':'斗降，犯者夺纪，北极紫微大帝降，又若月小则本日为十斋日',

'd1028':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd1029':'四天王巡行，又十斋日',

'd1030':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd1101':'地藏斋，又月朔，犯者夺纪，又十斋日',

'd1103':'斗降，犯者夺纪',

'd1104':'净宗十三祖印光法师圆寂日，又至圣先师孔子诞，犯者削禄夺纪',

'd1106':'雷斋日，犯者减寿，西岳大帝诞',

'd1108':'四天王巡行，又十斋日',

'd1111':'天地仓开日，太乙救苦天尊诞，犯者夺纪',

'd1114':'四天王巡行，又十斋日',

'd1115':'月望，上半夜犯男死下半夜犯女死，四天王巡行，又十斋日',

'd1117':'阿弥陀佛圣诞，又净宗二祖善导法师圆寂日',

'd1118':'地藏斋，又十斋日',

'd1119':'观音斋，太阳日宫诞，犯者得奇祸',

'd1121':'杨公忌',

'd1123':'张仙诞，犯者绝嗣，四天王巡行，又十斋日',

'd1124':'观音斋，又地藏斋，又十斋日',

'd1125':'掠刷大夫降，犯者遭大凶，月晦日，犯者减寿',

'd1126':'北方五道诞',

'd1127':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd1128':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd1129':'四天王巡行，又十斋日',

'd1130':'月晦，司命奏事，四天王巡行，犯者减寿，如月小，即戒廿九（每月同），又十斋日',

'd1201':'净宗四祖法照法师圆寂日，又地藏斋，又月朔，犯者夺纪，又十斋日',

'd1203':'斗降犯者夺纪',

'd1206':'天地仓开日，又雷斋日，犯者减寿',

'd1207':'掠刷大夫降，犯者得恶疾',

'd1208':'释迦牟尼佛成道，腊八节，又四天王巡行，初旬内戊日，亦名王侯腊，犯者夺纪，又十斋日',

'd1212':'太素三元君朝真',

'd1214':'四天王巡行，又十斋日',

'd1215':'月望，犯者夺纪，又四天王巡行，又十斋日',

'd1216':'南岳大帝诞',

'd1217':'净宗十二祖彻悟法师圆寂日',

'd1218':'地藏斋，又十斋日',

'd1219':'杨公忌',

'd1220':'天地交道，犯者促寿',

'd1221':'天猷上帝诞',

'd1223':'监斋菩萨圣诞，五岳诞降，又四天王巡行，又灶君节，又十斋日',

'd1224':'小年，地藏斋，又司命朝天奏人善恶，犯者得大祸，又十斋日',

'd1225':'观音斋，三清玉帝同降，考察善恶，犯者得奇祸，又月晦日，犯者减寿',

'd1227':'斗降，犯者夺纪，又若月小则本日为十斋日',

'd1228':'地藏斋，人神在阴，犯者得病，宜先一日即戒，又十斋日',

'd1229':'华严菩萨圣诞，又四天王巡行，又十斋日',

'd0100':'除夕，记得持斋诵戒！诸神下降，察访善恶，犯者男女俱亡，又十斋日',
	}

	/**
	 * 1890 - 2100 年的农历数据
	 * 数据格式：[0,2,9,21936]
	 * [闰月所在月，0为没有闰月; *正月初一对应公历月; *正月初一对应公历日; *农历每月的天数的数组（需转换为二进制,得到每月大小，0=小月(29日),1=大月(30日)）;]
	*/
	var lunarInfo = [[2,1,21,22184],[0,2,9,21936],[6,1,30,9656],[0,2,17,9584],[0,2,6,21168],[5,1,26,43344],[0,2,13,59728],[0,2,2,27296],[3,1,22,44368],[0,2,10,43856],[8,1,30,19304],[0,2,19,19168],[0,2,8,42352],[5,1,29,21096],[0,2,16,53856],[0,2,4,55632],[4,1,25,27304],[0,2,13,22176],[0,2,2,39632],[2,1,22,19176],[0,2,10,19168],[6,1,30,42200],[0,2,18,42192],[0,2,6,53840],[5,1,26,54568],[0,2,14,46400],[0,2,3,54944],[2,1,23,38608],[0,2,11,38320],[7,2,1,18872],[0,2,20,18800],[0,2,8,42160],[5,1,28,45656],[0,2,16,27216],[0,2,5,27968],[4,1,24,44456],[0,2,13,11104],[0,2,2,38256],[2,1,23,18808],[0,2,10,18800],[6,1,30,25776],[0,2,17,54432],[0,2,6,59984],[5,1,26,27976],[0,2,14,23248],[0,2,4,11104],[3,1,24,37744],[0,2,11,37600],[7,1,31,51560],[0,2,19,51536],[0,2,8,54432],[6,1,27,55888],[0,2,15,46416],[0,2,5,22176],[4,1,25,43736],[0,2,13,9680],[0,2,2,37584],[2,1,22,51544],[0,2,10,43344],[7,1,29,46248],[0,2,17,27808],[0,2,6,46416],[5,1,27,21928],[0,2,14,19872],[0,2,3,42416],[3,1,24,21176],[0,2,12,21168],[8,1,31,43344],[0,2,18,59728],[0,2,8,27296],[6,1,28,44368],[0,2,15,43856],[0,2,5,19296],[4,1,25,42352],[0,2,13,42352],[0,2,2,21088],[3,1,21,59696],[0,2,9,55632],[7,1,30,23208],[0,2,17,22176],[0,2,6,38608],[5,1,27,19176],[0,2,15,19152],[0,2,3,42192],[4,1,23,53864],[0,2,11,53840],[8,1,31,54568],[0,2,18,46400],[0,2,7,46752],[6,1,28,38608],[0,2,16,38320],[0,2,5,18864],[4,1,25,42168],[0,2,13,42160],[10,2,2,45656],[0,2,20,27216],[0,2,9,27968],[6,1,29,44448],[0,2,17,43872],[0,2,6,38256],[5,1,27,18808],[0,2,15,18800],[0,2,4,25776],[3,1,23,27216],[0,2,10,59984],[8,1,31,27432],[0,2,19,23232],[0,2,7,43872],[5,1,28,37736],[0,2,16,37600],[0,2,5,51552],[4,1,24,54440],[0,2,12,54432],[0,2,1,55888],[2,1,22,23208],[0,2,9,22176],[7,1,29,43736],[0,2,18,9680],[0,2,7,37584],[5,1,26,51544],[0,2,14,43344],[0,2,3,46240],[4,1,23,46416],[0,2,10,44368],[9,1,31,21928],[0,2,19,19360],[0,2,8,42416],[6,1,28,21176],[0,2,16,21168],[0,2,5,43312],[4,1,25,29864],[0,2,12,27296],[0,2,1,44368],[2,1,22,19880],[0,2,10,19296],[6,1,29,42352],[0,2,17,42208],[0,2,6,53856],[5,1,26,59696],[0,2,13,54576],[0,2,3,23200],[3,1,23,27472],[0,2,11,38608],[11,1,31,19176],[0,2,19,19152],[0,2,8,42192],[6,1,28,53848],[0,2,15,53840],[0,2,4,54560],[5,1,24,55968],[0,2,12,46496],[0,2,1,22224],[2,1,22,19160],[0,2,10,18864],[7,1,30,42168],[0,2,17,42160],[0,2,6,43600],[5,1,26,46376],[0,2,14,27936],[0,2,2,44448],[3,1,23,21936],[0,2,11,37744],[8,2,1,18808],[0,2,19,18800],[0,2,8,25776],[6,1,28,27216],[0,2,15,59984],[0,2,4,27424],[4,1,24,43872],[0,2,12,43744],[0,2,2,37600],[3,1,21,51568],[0,2,9,51552],[7,1,29,54440],[0,2,17,54432],[0,2,5,55888],[5,1,26,23208],[0,2,14,22176],[0,2,3,42704],[4,1,23,21224],[0,2,11,21200],[8,1,31,43352],[0,2,19,43344],[0,2,7,46240],[6,1,27,46416],[0,2,15,44368],[0,2,5,21920],[4,1,24,42448],[0,2,12,42416],[0,2,2,21168],[3,1,22,43320],[0,2,9,26928],[7,1,29,29336],[0,2,17,27296],[0,2,6,44368],[5,1,26,19880],[0,2,14,19296],[0,2,3,42352],[4,1,24,21104],[0,2,10,53856],[8,1,30,59696],[0,2,18,54560],[0,2,7,55968],[6,1,27,27472],[0,2,15,22224],[0,2,5,19168],[4,1,25,42216],[0,2,12,42192],[0,2,1,53584],[2,1,21,55592],[0,2,9,54560]];
	
	/**
	 * 二十四节气数据，节气点时间（单位是分钟）
	 * 从0小寒起算
	 */
	var termInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
	
	/**
	 * 判断农历年闰月数
	 * @param {Number} year 农历年
	 * return 闰月数 （月份从1开始）
	 */
	function getLunarLeapYear(year){
		var yearData = lunarInfo[year-minYear];
		return yearData[0];
	};
	
	/**
	 * 获取农历年份一年的每月的天数及一年的总天数
	 * @param {Number} year 农历年
	 */
	function getLunarYearDays(year){
		var yearData = lunarInfo[year-minYear];
		var leapMonth = yearData[0]; //闰月
		var monthData = yearData[3].toString(2);
		var monthDataArr = monthData.split('');
		
		//还原数据至16位,少于16位的在前面插入0（二进制存储时前面的0被忽略）
		for(var i=0;i<16-monthDataArr.length;i++){
			monthDataArr.unshift(0);
		}
		
		var len = leapMonth ? 13 : 12; //该年有几个月
		var yearDays = 0;
		var monthDays = [];
		for(var i=0;i<len;i++){
			if(monthDataArr[i]==0){
				yearDays += 29;
				monthDays.push(29);
			}else{
				yearDays += 30;
				monthDays.push(30);
			}
		}
		
		return {
			yearDays : yearDays,
			monthDays : monthDays
		};
	};
	
	/**
	 * 通过间隔天数查找农历日期
	 * @param {Number} year,between 农历年，间隔天数
	 */
	function getLunarDateByBetween(year,between){
		var lunarYearDays = getLunarYearDays(year);
		var end = between>0 ? between : lunarYearDays.yearDays - Math.abs(between);
		var monthDays = lunarYearDays.monthDays;
		var tempDays = 0;
		var month = 0;
		for(var i=0;i<monthDays.length;i++){
			tempDays += monthDays[i];
			if(tempDays > end){
				month = i;
				tempDays = tempDays-monthDays[i];
				break;
			}
		}
		
		return [year,month,end - tempDays + 1];
	};

	/**
	 * 根据距离正月初一的天数计算农历日期
	 * @param {Number} year 公历年，月，日
	 */
	function getLunarByBetween(year,month,day){
		var yearData = lunarInfo[year-minYear];
		var zenMonth = yearData[1];
		var zenDay = yearData[2];
		var between = getDaysBetweenSolar(year,zenMonth-1,zenDay,year,month,day);
		if(between==0){ //正月初一
			return [year,0,1];
		}else{
			var lunarYear = between>0 ? year : year-1;
			return getLunarDateByBetween(lunarYear,between);
		}
	};
	
	/**
	 * 两个公历日期之间的天数
	 */
	function getDaysBetweenSolar(year,month,day,year1,month1,day1){
		var date = new Date(year,month,day).getTime();
		var date1 = new Date(year1,month1,day1).getTime();
		return (date1-date) / 86400000;
	};
	
	/**
	 * 计算农历日期离正月初一有多少天
	 * @param {Number} year,month,day 农年，月(0-12，有闰月)，日
	 */
	function getDaysBetweenZheng(year,month,day){
		var lunarYearDays = getLunarYearDays(year);
		var monthDays = lunarYearDays.monthDays;
		var days = 0;
		for(var i=0;i<monthDays.length;i++){
			if(i<month){
				days += monthDays[i];
			}else{
				break;
			}
		};
		return days+day-1;
	};
	
	/**
	 * 某年的第n个节气为几日
	 * 31556925974.7为地球公转周期，是毫秒
	 * 1890年的正小寒点：01-05 16:02:31，1890年为基准点
	 * @param {Number} y 公历年
	 * @param {Number} n 第几个节气，从0小寒起算
	 * 由于农历24节气交节时刻采用近似算法，可能存在少量误差(30分钟内)
	 */
	function getTerm(y,n) {
		var offDate = new Date( ( 31556925974.7*(y-1890) + termInfo[n]*60000  ) + Date.UTC(1890,0,5,16,2,31) );
		return(offDate.getUTCDate());
	};
	
	/**
	 * 获取公历年一年的二十四节气
	 * 返回key:日期，value:节气中文名
	 */
	function getYearTerm(year){
		var res = {};
		var month = 0;
		for(var i=0;i<24;i++){
			var day = getTerm(year,i);
			if(i%2==0)month++
			res[formateDayD4(month-1,day)] = DATA.solarTerm[i];
		}
		return res;
	};
	
	/**
	 * 获取生肖
	 * @param {Number} year 干支所在年（默认以立春前的公历年作为基数）
	 */
	function getYearZodiac(year){
		 var num = year-1890+25; //参考干支纪年的计算，生肖对应地支
		 return DATA.zodiac[num%12];
	};
	
	/**
	 * 计算天干地支
	 * @param {Number} num 60进制中的位置(把60个天干地支，当成一个60进制的数)
	 */
	function cyclical(num) {
		return(DATA.heavenlyStems[num%10]+DATA.earthlyBranches[num%12]);
	}
	
	/**
	 * 获取干支纪年
	 * @param {Number} year 干支所在年
	 * @param {Number} offset 偏移量，默认为0，便于查询一个年跨两个干支纪年（以立春为分界线）
	 */
	function getLunarYearName(year,offset){
		offset = offset || 0;
		//1890年1月小寒（小寒一般是1月5或6日）以前为己丑年，在60进制中排25
		return cyclical(year-1890+25+offset);
	};
	
	/**
	 * 获取干支纪月
	 * @param {Number} year,month 公历年，干支所在月
	 * @param {Number} offset 偏移量，默认为0，便于查询一个月跨两个干支纪月（有立春的2月）
	 */
	function getLunarMonthName(year,month,offset){
		offset = offset || 0;
		//1890年1月小寒以前为丙子月，在60进制中排12
		return cyclical((year-1890)*12+month+12+offset);
	};
	
	/**
	 * 获取干支纪日
	 * @param {Number} year,month,day 公历年，月，日
	 */
	function getLunarDayName(year,month,day){
		//当日与1890/1/1 相差天数
		//1890/1/1与 1970/1/1 相差29219日, 1890/1/1 日柱为壬午日(60进制18)
		var dayCyclical = Date.UTC(year,month,day)/86400000+29219+18;
		return cyclical(dayCyclical);
	};
	
	/**
	 * 获取公历月份的天数
	 * @param {Number} year 公历年
	 * @param {Number} month 公历月
	 */
	function getSolarMonthDays(year,month){
		 var monthDays = [31,isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31];
		 return monthDays[month];
	};
	
	/**
	 * 判断公历年是否是闰年
	 * @param {Number} year 公历年
	 */
	function isLeapYear(year){
		return ((year%4==0 && year%100 !=0) || (year%400==0));
	};
		
	/*
	 * 统一日期输入参数（输入月份从1开始，内部月份统一从0开始）
	 */
	function formateDate(year,month,day,_minYear){
		var argsLen = arguments.length;
		var now = new Date();
		year = argsLen ? parseInt(year,10) : now.getFullYear();
		month = argsLen ? parseInt(month-1,10) : now.getMonth();
		day = argsLen ? parseInt(day,10) || now.getDate() : now.getDate();
		if(year < (_minYear ? _minYear : minYear+1) || year > maxYear)return {error:100, msg:errorCode[100]};
		return {
			year : year,
			month : month,
			day : day
		};
	};
	
	/**
	 * 将农历转换为公历
	 * @param {Number} year,month,day 农历年，月(1-13，有闰月)，日
	 */
	function lunarToSolar(_year,_month,_day){
		var inputDate = formateDate(_year,_month,_day);
		if(inputDate.error)return inputDate;
		var year = inputDate.year;
		var month = inputDate.month;
		var day = inputDate.day;
		
		var between = getDaysBetweenZheng(year,month,day); //离正月初一的天数
		var yearData = lunarInfo[year-minYear];
		var zenMonth = yearData[1];
		var zenDay = yearData[2];
		
		var offDate = new Date(year,zenMonth-1,zenDay).getTime() + between * 86400000;
			offDate = new Date(offDate);
		return {
			year : offDate.getFullYear(),
			month : offDate.getMonth()+1,
			day : offDate.getDate()
		};
	};
	
	/**
	 * 将公历转换为农历
	 * @param {Number} year,month,day 公历年，月，日
	 */
	function solarToLunar(_year,_month,_day){
		var inputDate = formateDate(_year,_month,_day,minYear);
		if(inputDate.error)return inputDate;
		var year = inputDate.year;
		var month = inputDate.month;
		var day = inputDate.day;
		
		cacheUtil.setCurrent(year);
		//立春日期
		var term2 = cacheUtil.get('term2') ? cacheUtil.get('term2') : cacheUtil.set('term2',getTerm(year,2));
		//二十四节气
		var termList = cacheUtil.get('termList') ? cacheUtil.get('termList') : cacheUtil.set('termList',getYearTerm(year));
		
		var firstTerm = getTerm(year,month*2); //某月第一个节气开始日期
		var GanZhiYear = (month>1 || month==1 && day>=term2) ? year+1 : year;//干支所在年份
		var GanZhiMonth = day>=firstTerm ? month+1 : month; //干支所在月份（以节气为界）
		
		var lunarDate = getLunarByBetween(year,month,day);
		var lunarLeapMonth = getLunarLeapYear(lunarDate[0]);
		var lunarMonthName = '';
		if(lunarLeapMonth>0 && lunarLeapMonth==lunarDate[1]){
			lunarMonthName = '闰'+DATA.monthCn[lunarDate[1]-1]+'月';
		}else if(lunarLeapMonth>0 && lunarDate[1]>lunarLeapMonth){
			lunarMonthName = DATA.monthCn[lunarDate[1]-1]+'月';
		}else{
			lunarMonthName = DATA.monthCn[lunarDate[1]]+'月';
		}
		
		//农历节日判断
		var lunarFtv = '';
		var lunarMonthDays = getLunarYearDays(lunarDate[0]).monthDays;
		//除夕
		if(lunarDate[1] == lunarMonthDays.length-1 && lunarDate[2]==lunarMonthDays[lunarMonthDays.length-1]){
			lunarFtv = lunarFestival['d0100'];
		}else if(lunarLeapMonth>0 && lunarDate[1]>lunarLeapMonth){
			lunarFtv = lunarFestival[formateDayD4(lunarDate[1]-1,lunarDate[2])];
		}else{
			lunarFtv = lunarFestival[formateDayD4(lunarDate[1],lunarDate[2])];
		}
		
		var res = {
			zodiac : getYearZodiac(GanZhiYear),
			GanZhiYear : getLunarYearName(GanZhiYear),
			GanZhiMonth : getLunarMonthName(year,GanZhiMonth),
			GanZhiDay : getLunarDayName(year,month,day),
			//放假安排：0无特殊安排，1工作，2放假
			worktime : worktime['y'+year] && worktime['y'+year][formateDayD4(month,day)] ? worktime['y'+year][formateDayD4(month,day)] : 0,
			term : termList[formateDayD4(month,day)],
			
			lunarYear : lunarDate[0],
			lunarMonth : lunarDate[1]+1,
			lunarDay : lunarDate[2],
			lunarMonthName : lunarMonthName,
			lunarDayName : DATA.dateCn[lunarDate[2]-1],
			lunarLeapMonth : lunarLeapMonth,
			
			solarFestival : solarFestival[formateDayD4(month,day)],
			lunarFestival : lunarFtv
		};

		return res;
	};
	
	/**
	 * 获取指定公历月份的农历数据
	 * return res{Object}
	 * @param {Number} year,month 公历年，月
	 * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始
	 */
	function calendar(_year,_month,fill){
		var inputDate = formateDate(_year,_month);
		if(inputDate.error)return inputDate;
		var year = inputDate.year;
		var month = inputDate.month;
		
		var calendarData = solarCalendar(year,month+1,fill);
		for(var i=0;i<calendarData.monthData.length;i++){
			var cData = calendarData.monthData[i];
			var lunarData = solarToLunar(cData.year,cData.month,cData.day);
			extend(calendarData.monthData[i],lunarData);
		}
		return calendarData;
	};
	
	/**
	 * 公历某月日历
	 * return res{Object}
	 * @param {Number} year,month 公历年，月
	 * @param {Boolean} fill 是否用上下月数据补齐首尾空缺，首例数据从周日开始 (7*6阵列)
	 */
	function solarCalendar(_year,_month,fill){
		var inputDate = formateDate(_year,_month);
		if(inputDate.error)return inputDate;
		var year = inputDate.year;
		var month = inputDate.month;
		
		var firstDate = new Date(year,month,1);
		var preMonthDays,preMonthData,nextMonthData;
		
		var res = {
			firstDay : firstDate.getDay(), //该月1号星期几
			monthDays : getSolarMonthDays(year,month), //该月天数
			monthData : []
		};
		
		res.monthData = creatLenArr(year,month+1,res.monthDays,1);

		if(fill){
			if(res.firstDay > 0){ //前补
				var preYear = month-1<0 ? year-1 : year;
				var preMonth = month-1<0 ? 11 : month-1;
				preMonthDays = getSolarMonthDays(preYear,preMonth);
				preMonthData = creatLenArr(preYear,preMonth+1,res.firstDay,preMonthDays-res.firstDay+1);
				res.monthData = preMonthData.concat(res.monthData);
			}
			
			if(7*6 - res.monthData.length!=0){ //后补
				var nextYear = month+1>11 ? year+1 : year;
				var nextMonth = month+1>11 ? 0 : month+1;
				var fillLen = 7*6 - res.monthData.length;
				nextMonthData = creatLenArr(nextYear,nextMonth+1,fillLen,1);
				res.monthData = res.monthData.concat(nextMonthData);
			}
		}
		
		return res;
	};
	
	/**
	 * 设置放假安排【对外暴露接口】
	 * @param {Object} workData
	 */
	function setWorktime(workData){
		extend(worktime,workData);
	};

	var LunarCalendar = {
		solarToLunar : solarToLunar,
		lunarToSolar : lunarToSolar,
		calendar : calendar,
		solarCalendar : solarCalendar,
		setWorktime : setWorktime,
		getSolarMonthDays : getSolarMonthDays
	};
	
	if (typeof define === 'function'){
		define (function (){
			return LunarCalendar;
		});
	}else if(typeof exports === 'object'){
		module.exports = LunarCalendar;
	}else{
		window.LunarCalendar = LunarCalendar;
	};
})();