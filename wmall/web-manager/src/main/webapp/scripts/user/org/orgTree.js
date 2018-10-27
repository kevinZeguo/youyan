
function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
    if (treeNode == null)
        return;
    // 如果需要勾选原来已选中的节点，需要在此处处理
}

function zTreeBeforeCheck(treeId, treeNode, clickFlag) {
    // alert(!treeNode.isParent);
    return !treeNode.isParent;// 当是父节点 返回false 不让选取
}


//组织树
function initOrgTree($id) {
    var setting = {
        async: {
            enable: true,
            url: getContextPath("/base/org/orgTree.do"),
            autoParam: ["id=parentId", "type"]
        },
        check: {
            enable: true,
            chkStyle: "radio"
        },
        data: {
            key: {
                name: "name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: 0
            }
        },
        callback: {
            beforeCheck: zTreeBeforeCheck,
            onAsyncSuccess: zTreeOnAsyncSuccess
        }
    };
    setting.check.radioType = "all";
    moTreeProduct = $.fn.zTree.init($($id), setting);
}

//组织人员树
function initUserTree($id) {
    var setting = {
        async: {
            enable: true,
            url: getContextPath("/base/org/userTree.do"),
            autoParam: ["id=parentId", "type"]
        },
        check: {
            enable: true,
            chkStyle: "radio"
        },
        data: {
            key: {
                name: "name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: 0
            }
        },
        callback: {
            beforeCheck: zTreeBeforeCheck,
            onAsyncSuccess: zTreeOnAsyncSuccess
        }
    };
    setting.check.radioType = "all";
    moTreeProduct = $.fn.zTree.init($($id), setting);
}

/**
 * 获取值
 * @param id
 * @param property
 * @returns {string}
 */
function getOrgData(id) {
    var treeObj = $.fn.zTree.getZTreeObj(id),
        nodes = treeObj.getCheckedNodes(true),
        v = "";
    for (var i = 0; i < nodes.length; i++) {
        if(nodes[i].type == 2){
            if (v != "") {
                v += ",";
            }
            v += nodes[i].id;
        }
    }
    return v;
}

/**
 * 获取值
 * @param id
 * @param property
 * @returns {string}
 */
function getUserData(id) {
    var treeObj = $.fn.zTree.getZTreeObj(id),
        nodes = treeObj.getCheckedNodes(true),
        v = "";
    for (var i = 0; i < nodes.length; i++) {
        if(nodes[i].type == 3){
            if (v != "") {
                v += ",";
            }
            v += nodes[i].id;
        }
    }
    return v;
}
/**
 * 根据属性获取值
 * 支持属性
 * name :名称
 * type:类型  1-组织 2-部门 3-人员
 * @param id
 * @param pro
 * @returns {string}
 */
function getUserPropertyData(id,pro){
    var treeObj = $.fn.zTree.getZTreeObj(id),
        nodes = treeObj.getCheckedNodes(true),
        v = "";
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node["type"] == 3){
            if (v != "") {
                v += ",";
            }
            v += node[pro];
        }
    }
    return v;
}

/**
 * 根据属性获取值
 * 支持属性
 * name :名称
 * type:类型  1-组织 2-部门 3-人员
 * @param id
 * @param pro
 * @returns {string}
 */
function getOrgPropertyData(id,pro){
    var treeObj = $.fn.zTree.getZTreeObj(id),
        nodes = treeObj.getCheckedNodes(true),
        v = "";
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if(node["type"] == 2){
            if (v != "") {
                v += ",";
            }
            v += node[pro];
        }
    }
    return v;
}