/**
 * 区域控件定义
 */
$(document).ready(function () {
    //渲染select2样式
    $("#province").select2();
    $("#city").select2();
    $("#town").select2();

    initProvice();
    //选择省份
    $("#province").change(function () {
        var provinceId = $("#province").val();
        var cityId = $("#city").val();
        var townId = $("#town").val();
        $("#city").empty();
        $("#town").empty();
        if (provinceId != null && provinceId != "" && provinceId > 0) {
            initCity(provinceId, cityId, townId);
        } else {
            $("#city").empty();
            $("#city").append("<option value='-1'>请先选择省份</option>");
            $("#city").attr("disabled", true);
            $("#city").select2();

            $("#town").empty();
            $("#town").append("<option value='-1'>请先选择省份</option>");
            $("#town").attr("disabled", true);
            $("#town").select2();
        }
    });

    //选择地市
    $("#city").change(function () {
        var cityId = $("#city").val();
        var townId = $("#town").val();
        $("#town").empty();
        if (cityId != null && cityId != "" && cityId > 0) {
            initTown(cityId, townId);
        } else {
            $("#town").empty();
            $("#town").append("<option  value='-1'>请先选择地市</option>");
            $("#town").attr("disabled", true);
            $("#town").select2();
        }
    });
});

function initProvice() {
    var provinceId = $("#province").val();
    $("#province").empty();
    $.ajax({
        type: 'POST',
        url: getContextPath("/area/getChildAreaList.do"),
        data: {areaParId: '0'},
        dataType: 'json',
        success: function (data) {
            if (data.list != null) {
                var pHtml = "<option  value='-1'> 请选择省份</option>";
                var pList = data.list;
                var isSelect = false;
                for (var i = 0; i < pList.length; i++) {
                    var p = pList[i];
                    var pv = p.areaId;
                    pHtml += "<option value='" + pv + "' ";
                    if (provinceId == pv) {
                        pHtml += " selected ";
                        isSelect = true;
                    }
                    pHtml += "> " + p.areaName + "</option>";

                }
                $("#province").append(pHtml);
                //如果省份的值是"请选择"
                if (!isSelect) {
                    $("#city").empty();
                    $("#city").append("<option  value='-1'>请先选择省份</option>");
                    $("#city").attr("disabled", true);
                    $("#city").select2();

                    $("#town").empty();
                    $("#town").append("<option  value='-1'>请先选择省份</option>");
                    $("#town").attr("disabled", true);
                    $("#town").select2();
                } else {
                    $("#province").val(provinceId).trigger("change");
                    //$("#city").empty();
                    //$("#city").append("<option  value='-1'>请先选择省份</option>");
                    //$("#city").attr("disabled", true);
                    //$("#city").select2();
                    //初始化地市
                    initCity(provinceId);
                }
            } else {
            }
        }
    });
}

function initCity(provinceId) {
    var cityId = $("#city").val();
    $("#city").empty();
    $("#city").append("<option  value='-1'>请选择地市</option>");
    //$($city).select2();
    $("#city").attr("disabled", true);
    $.ajax({
        type: 'POST',
        url: getContextPath("/area/getChildAreaList.do"),
        dataType: 'json',
        data: {areaParId: provinceId},
        success: function (data) {
            try {
                if (data.list != null) {
                    var cHtml = "<option  value='-1'> 请选择地市</option>";
                    var cList = data.list;
                    var isSelect = false;
                    for (var i = 0; i < cList.length; i++) {
                        var c = cList[i];
                        cHtml += "<option value='" + c.areaId + "' ";
                        if (cityId == c.areaId) {
                            cHtml += " selected ";
                            isSelect = true;
                        }
                        cHtml += "> " + c.areaName + "</option>";

                    }
                    $("#city").empty();
                    $("#city").append(cHtml);

                    //如果子公司的值是"请选择"
                    if (!isSelect) {
                        $("#city").val("").trigger("change");
                        $("#town").empty();
                        $("#town").append("<option  value='-1'>请先选择所属产品线</option>");
                        $("#town").attr("disabled", true);
                        $("#town").select2();
                    } else {
                        $("#city").val(cityId).trigger("change");
                        //初始化应用
                        initTown(cityId);
                    }

                } else {
                    //$.bdpUtil.alertDialog($("#request-form"), data.message);
                }
            } catch (e) {

            }
            $("#city").removeAttr("disabled");
        }
    });
}

function initTown(cityId) {
    var townId = $("#town").val();
    $("#town").empty();
    $("#town").append("<option value='-1' selected>请选择</option>");
    $("#town").select2();
    $("#town").attr("disabled", true);
    $.ajax({
        type: 'POST',
        url: getContextPath("/area/getChildAreaList.do"),
        dataType: 'json',
        data: {areaParId: cityId},
        success: function (data) {
            try {
                if (data.list != null) {
                    var tList = data.list;
                    var isSelect = false;
                    var tHtml = "<option value='-1' selected>请选择</option>";
                    for (var i = 0; i < tList.length; i++) {
                        var t = tList[i];
                        tHtml += "<option value='" + t.areaId + "'  ";
                        if (townId == t.areaId) {
                            tHtml += " selected ";
                            isSelect = true;
                        }
                        tHtml += "> " + t.areaName + "</option>";

                    }
                    $("#town").empty();
                    $("#town").append(tHtml);
                    $("#town").select2();
                    if (isSelect) {
                        $("#town").val(townId).trigger("change");
                    }

                } else {
                }
            } catch (e) {
            }
            $("#town").removeAttr("disabled");
        }
    });
}