var china = [
 //直辖市
 ['北京市'],
 ['上海市'],
 ['天津市'],
 ['重庆市'],
 //华北地区
 ['河北省','石家庄市','唐山市','秦皇岛市','邯郸市','邢台市','保定市','张家口市','承德市','沧州市','廊坊市','衡水市'],
 ['山西省','太原市','大同市','阳泉市','长治市','晋城市','朔州市','晋中市','运城市','忻州市','临汾市','吕梁市'],
 ['内蒙古自治区','呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市','兴安盟','锡林郭勒盟','阿拉善盟'],
 //东北地区
 ['辽宁省','沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],
 ['吉林省','长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延边市'],
 ['黑龙江','哈尔滨市','齐齐哈尔市','鸡西市','鹤岗市','双鸭山市','大庆市','伊春市','佳木斯市','七台河市','牡丹江市','黑河市','绥化市','大兴安岭市'],
 //华东地区
 ['江苏省','南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','盐城市','扬州市','镇江市','泰州市','宿迁市'],
 ['浙江省','杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'],
 ['安徽省','合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','巢湖市','六安市','亳州市','池州市','宣城市'],
 ['福建省','福州市','厦门市','莆田市','三明市','泉州市','漳州市','南平市','龙岩市','宁德市'],
 ['江西省','南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市'],
 ['山东省','济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','威海市','济宁市','泰安市','日照市','莱芜市','临沂市','德州市','聊城市','滨州市','菏泽市'],
 //中南地区
 ['河南省','郑州市','开封市','洛阳市','平顶山市','焦作市','鹤壁市','新乡市','安阳市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市'],
 ['湖北省','武汉市','黄石市','襄樊市','十堰市','荆州市','宜昌市','荆门市','鄂州市','孝感市','咸宁市','随州市','恩施土家族苗族自治州'],
 ['湖南省','长沙市','株洲市','湘潭市','衡阳市','邵阳市','岳阳市','常德市','张家界市','益阳市','郴州市','永州市','怀化市','娄底市','湘西土家族苗族自治州'],
 ['广东省','广州市','深圳市','珠海市','汕头市','韶关市','佛山市','江门市','湛江市','茂名市','肇庆市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'],
 ['广西自治区','南宁市','柳州市','桂林市','梧州市','北海市','防城港市','钦州市','贵港市','玉林市','百色市','贺州市','河池市','来宾市','崇左市'],
 ['海南省','海口市','三亚市'],
 //西南地区
 ['四川省','成都市','自贡市','攀枝花市','泸州市','德阳市','绵阳市','广元市','遂宁市','内江市','乐山市','南充市','宜宾市','广安市','达州市','眉山市','雅安市','巴中市','资阳市','阿坝藏族羌族自治州','甘孜藏族自治州','凉山彝族自治州'],
 ['贵州省','贵阳市',"六盘水市","遵义市","安顺市","铜仁市","毕节市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"],
 ['云南省','昆明市','曲靖市','玉溪市',"保山市","昭通市","丽江市","普洱市","临沧市","文山壮族苗族自治州","红河哈尼族彝族自治州","西双版纳傣族自治州","楚雄市","楚雄彝族自治州","大理市","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"],
 ['西藏自治区',"拉萨市","昌都地区","山南地区","日喀则市","那曲地区","阿里地区","林芝地区"],
 //西北地区
 ['陕西省','西安市','铜川市','宝鸡市','咸阳市','渭南市','延安市','汉中市','榆林市','安康市','商洛市'],
 ['甘肃省',"兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏市","甘南市"],
 ['青海省',"西宁市","海东市","海北市","黄南市","海南市","果洛市","玉树市","海西市"],
 ['宁夏自治区','银川市',"石嘴山市","吴忠市","固原市","中卫市"],
 ['新疆自治区','乌鲁木齐市',"克拉玛依市","吐鲁番地区","哈密地区","和田地区","阿克苏地区","喀什地区","克孜勒苏柯尔克孜自治州","巴音郭楞蒙古自治州","昌吉回族自治州","博尔塔拉蒙古自治州","伊犁哈萨克自治州","塔城地区","阿勒泰地区"],
 //港澳台
 ['香港特别行政区'],
 ['澳门特别行政区'],
 ['台湾省',"台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市"]
 ];

 function BindProvince(){
    var opt0 = "省份";
    var ProvinceCount=china.length;
    var ddlProvince = document.getElementById("ddlProvince");
    ddlProvince.innerHTML = "";
    ddlProvince.options[0] = new Option(opt0,"");
    for(var i=0; i<ProvinceCount; i++){
        ddlProvince.options[i+1] = new Option(china[i][0],china[i][0]);
    }
 }

 function BindCity(City){
    var opt0 = "省份";
    var ProvinceCount=china.length;
    var ddlProvince = document.getElementById("ddlProvince");
    ddlProvince.innerHTML = "";
    ddlProvince.options[0] = new Option(opt0,"");
    
    var opt0City = "城市";
    var ddlCity = document.getElementById("ddlCity");
    ddlCity.innerHTML = "";
    ddlCity.options[0] = new Option(opt0City,"");

    var flag=false;
    var chose=true;
    var selectProvinceIndex=0;
    for(var i=0; i<ProvinceCount; i++){
        if(!flag){
            var cityCount = china[i].length;
            for(var j=1; j<cityCount; j++){
                if(china[i][j]==City)
                {
                    flag=true;
                    selectProvinceIndex=i;
                    break;
                }
            }
        }
        ddlProvince.options[i+1] = new Option(china[i][0],china[i][0]);
        if(flag && chose){
            ddlProvince.options[i+1].selected = true;
            chose=false;
        }
    }
    var cityCount = china[selectProvinceIndex].length;
    for(var i=0; i<cityCount; i++){
        if(cityCount == 1 && i == 0){
            ddlCity.options[i+1] = new Option(china[selectProvinceIndex][i],china[selectProvinceIndex][i]);
            i = 1;
        }
        else if(cityCount > 1 && i == 0){
            i = 1;
            ddlCity.options[i] = new Option(china[selectProvinceIndex][i],china[selectProvinceIndex][i]);
        }
        else{
            ddlCity.options[i] = new Option(china[selectProvinceIndex][i],china[selectProvinceIndex][i]);
        }
        if(china[selectProvinceIndex][i]==City){
            ddlCity.options[i].selected=true;
        }
    }

 }

 function selectMoreCity(sbj){
        var opt0 = "城市";
        if(sbj.selectedIndex==0){
            var ddlCity = document.getElementById("ddlCity");
            ddlCity.innerHTML = "";
            ddlCity.options[0] = new Option(opt0,"");
            return;
        }
        var selectProvince = sbj.options[sbj.selectedIndex].value;
        var ProvinceCount = china.length;
        for(var i=0; i<ProvinceCount; i++){
            if(china[i][0] == selectProvince){
                var cityCount = china[i].length;
                var ddlCity = document.getElementById("ddlCity");
                ddlCity.innerHTML = "";
                ddlCity.options[0] = new Option(opt0,"");
                for(var j=0; j<cityCount; j++){
                    if(cityCount == 1 && j == 0){
                        ddlCity.options[j+1] = new Option(china[i][j],china[i][j]);
                        j = 1;
                    }
                     else if(cityCount > 1 && j == 0){
                        j = 1;
                         ddlCity.options[j] = new Option(china[i][j],china[i][j]);
                     }
                     else{
                         ddlCity.options[j] = new Option(china[i][j],china[i][j]);
                    }
                    if(j == 1){
                         ddlCity.options[1].selected = true;
                    }
                }
                break;
            }
        }
    }