package com.claude.wmall.web.controller.org;

import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.DeptTable;
import com.claude.wmall.shopping.domain.OrgTable;
import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.service.DepartmentService;
import com.claude.wmall.shopping.service.OrganizationService;
import com.claude.wmall.shopping.service.UserService;
import net.sf.json.JSONObject;
import net.sf.json.JSONArray;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by mazeguo on 2016/8/25.
 */
@Controller
@RequestMapping("/base/org/")
public class OrganizationController {
    private static final Log log = LogFactory.getLog(OrganizationController.class);
    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private UserService userService;

    @RequestMapping("orgTree")
    public View getOrgTree(Integer parentId, Integer type, HttpServletResponse response) {
        if (parentId == null || parentId.equals("")) {
            parentId = 0;
        }
        //type默认为1
        if (type == null || type.equals("")) {
            type = 1;
        }
        PrintWriter out = null;
        JSONArray treeArray = new JSONArray();
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            //判断parentId是否大于0
            //查找组织列表
            //父Id小小于10000，则为查询组织信息
            if (type == 1) {
                List<OrgTable> orgTables = organizationService.findOrgListByParenTId(parentId);
                if (orgTables != null && orgTables.size() > 0) {
                    JSONObject orgObj;
                    for (OrgTable org : orgTables) {
                        orgObj = new JSONObject();
                        orgObj.put("id", org.getOrgId());
                        orgObj.put("name", org.getOrgName());
                        orgObj.put("type", 1);
                        orgObj.put("parentId", org.getParentId());
                        orgObj.put("isParent", true);
                        orgObj.put("nocheck",true);
                        orgObj.put("open",true);
                        treeArray.add(orgObj);
                    }
                } else {
                    List<DeptTable> deptTables = departmentService.findListByOrgId(parentId);
                    JSONObject orgObj;
                    for (DeptTable dept : deptTables) {
                        orgObj = new JSONObject();
                        orgObj.put("id", dept.getDeptId());
                        orgObj.put("name", dept.getDeptName());
                        orgObj.put("type", 2);
                        //orgObj.put("parentId", dept.getParentId());
                        orgObj.put("isParent", false);
                        treeArray.add(orgObj);
                    }
                }

            }

            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(treeArray.toString());
            out.flush();
            out.close();
        } catch (Exception e) {
            log.error("查询失败！", e);
        } finally {
            out.close();
        }
        return new SuccessFailView(treeArray);

    }


    @RequestMapping("userTree")
    public View getUserTree(Integer parentId, Integer type, HttpServletResponse response) {
        if (parentId == null || parentId.equals("")) {
            parentId = 0;
        }
        //type默认为1
        if (type == null || type.equals("")) {
            type = 1;
        }

        PrintWriter out = null;
        JSONArray treeArray = new JSONArray();
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            //判断parentId是否大于0
            //查找组织列表
            //父Id小小于10000，则为查询组织信息
            if (type == 1) {
                List<OrgTable> orgTables = organizationService.findOrgListByParenTId(parentId);
                if (orgTables != null && orgTables.size() > 0) {
                    JSONObject orgObj;
                    for (OrgTable org : orgTables) {
                        orgObj = new JSONObject();
                        orgObj.put("id", org.getOrgId());
                        orgObj.put("type", 1);
                        orgObj.put("name", org.getOrgName());
                        orgObj.put("parentId", org.getParentId());
                        orgObj.put("isParent", true);
                        orgObj.put("nocheck",true);
                        orgObj.put("open",true);
                        treeArray.add(orgObj);
                    }
                } else {//组织为空，则查询部门
                    List<DeptTable> deptTables = departmentService.findListByOrgId(parentId);
                    JSONObject orgObj;
                    if (deptTables != null && deptTables.size() > 0) {//组织不为空
                        for (DeptTable dept : deptTables) {
                            orgObj = new JSONObject();
                            orgObj.put("id", dept.getDeptId());
                            orgObj.put("type", 2);
                            orgObj.put("name", dept.getDeptName());
                            //orgObj.put("parentId", dept.getParentId());
                            orgObj.put("isParent", true);
                            treeArray.add(orgObj);
                        }
                    }
                }
            } else if (type == 2) {
                JSONObject orgObj;
                List<User> users = userService.getListByDeptId(parentId);
                if (users != null && users.size() > 0) {
                    for (User user : users) {
                        orgObj = new JSONObject();
                        orgObj.put("id", user.getID());
                        orgObj.put("name", user.getvRealName());
                        orgObj.put("type", 3);
                        orgObj.put("parentId", user.getDeptId());
                        orgObj.put("isParent", false);
                        treeArray.add(orgObj);
                    }
                }
            }

            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(treeArray.toString());
            out.flush();
            out.close();
        } catch (Exception e) {
            log.error("查询失败！", e);
        } finally {
            out.close();
        }
        return new SuccessFailView(treeArray);

    }

    @RequestMapping("orgTreeDemo")
    public String toOrgTree() {
        return "/user/org/orgTree";
    }
}
