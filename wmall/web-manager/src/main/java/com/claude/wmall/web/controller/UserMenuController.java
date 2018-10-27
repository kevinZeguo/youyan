package com.claude.wmall.web.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.SysMenu;
import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.domain.UserMenu;
import com.claude.wmall.shopping.service.SysMenuService;
import com.claude.wmall.shopping.service.UserMenuService;

@Controller
@RequestMapping("/userMenu")
public class UserMenuController {
    private static final Log log = LogFactory.getLog(UserMenuController.class);
    @Autowired()
    private UserMenuService userMenuService;

    @Autowired()
    private SysMenuService sysMenuService;


    public void setUserMenuService(UserMenuService userMenuService) {
        this.userMenuService = userMenuService;
    }

    public void setPowerService(SysMenuService sysMenuService) {
        this.sysMenuService = sysMenuService;
    }

    //跳转到管理员权限表
    @RequestMapping(value = "rAdminSysMenu")
    public String rAdminSysMenu(HttpServletRequest request) {
        //String vID = request.getParameter("vID");
        //request.setAttribute("vID", vID);
        String roleId = request.getParameter("roleId");
        request.setAttribute("roleId", roleId);
        return "sysMenu/adminSysMemu";
    }

    //跳转到个人管理员权限表
    @RequestMapping(value = "rAdminPerUserSysMenu")
    public String rAdminPerUserSysMenu(HttpServletRequest request) {
        String vID = request.getParameter("vID");
        request.setAttribute("vID", vID);
        return "sysMenu/adminPerUserMemu";
    }

    //跳转到公司会员权限表
    @RequestMapping(value = "rAdminComPerUserMenu")
    public String rAdminComPerUserMenu(HttpServletRequest request) {

        String vID = request.getParameter("vID");
        request.setAttribute("vID", vID);
        return "sysMenu/adminComPerUserMemu";
    }

    //跳转到公司管理员权限表
    @RequestMapping(value = "rAdminComAdminMenu")
    public String rAdminComAdminMenu(HttpServletRequest request) {
        String vID = request.getParameter("vID");
        request.setAttribute("vID", vID);
        return "sysMenu/adminComAdminMemu";
    }

    //保存权限
    //通过session获得操作人ID
    @RequestMapping(value = "saveUserMenu")
    public View saveUserMenu(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("......................saveUserMenu");
        String menuIDs = request.getParameter("menuIDs");
        String parentIDs = request.getParameter("parentIDs");
        //String vID = request.getParameter("vID");
        String roleId = request.getParameter("roleId");
        userMenuService.deleteMenu(new Integer(roleId));
        String parentIDs2[] = parentIDs.split(",");
        String menuIDs2[] = menuIDs.split(",");
        for (int i = 1; i < menuIDs2.length; i++) {
            String menuID = menuIDs2[i];
            String parentID = parentIDs2[i];
            UserMenu userMenu = new UserMenu();
            userMenu.setvMenuID(menuID);
            userMenu.setvParentID(parentID);
            userMenu.setvUserID(new Integer(roleId));
            //User user = (User) session.getAttribute(Constants.USER_KEY);
            userMenu.setvInsertBy(2);
            userMenu.setvInsertDate(new Date());
            userMenuService.save(userMenu);
        }
        return new SuccessFailView(true, "保存成功");
    }

    //查询个人用户菜单权限
    @RequestMapping(value = "getPerUserMenuList")
    public View getPerUserMenuList(HttpServletRequest request) {
        String roleId = request.getParameter("roleId");
        List<SysMenu> lists = sysMenuService.getUserMenuList(new Integer(roleId));
        return new SuccessFailView(lists);

    }


    // 首页用户功能菜单
    @RequestMapping(value = "getUserMenuList")
    public View getUserMenuList(HttpServletRequest request) {

        try {
            User user = (User) request.getSession().getAttribute(Constants.USER_KEY);
            if (user.getID() == null) {
                // message = "您尚未登录，请登录系统后继续操作！";
                return new SuccessFailView(false, "请重新登录。");
            }
            List<SysMenu> lists = sysMenuService.getUserMenuList(new Integer(user.getvType()));
            return new SuccessFailView(lists);
        } catch (Exception e) {
            log.error("查询个人菜单失败！", e);
            return new SuccessFailView(false, "请重新登录。");
        }
    }


    //的所有权限
    @RequestMapping(value = "menuTree")
    public View menuTree(HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        System.out.println("....menuTree.....");
        List<SysMenu> listSysMenuTreeView = this.sysMenuService.getListByParams(null, null, -1, -1);
        PrintWriter out = null;
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            JSONArray array = new JSONArray();
            array = JSONArray.fromObject(listSysMenuTreeView);
            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(array.toString());
            out.flush();
            out.close();
        } finally {
            if (out != null) {
                out.close();
            }
        }
        return new SuccessFailView(listSysMenuTreeView);

    }


    //个人会员的权限
    @RequestMapping(value = "getSysMenuByPerUser")
    public View getSysMenuByPerUser(HttpServletRequest request,
                                    HttpServletResponse response) throws IOException {
        List<SysMenu> listSysMenuTreeView = this.sysMenuService.getSysMenuByPerUser();
        PrintWriter out = null;
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            JSONArray array = new JSONArray();
            array = JSONArray.fromObject(listSysMenuTreeView);
            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(array.toString());
            out.flush();
            out.close();
        } finally {
            if (out != null) {
                out.close();
            }
        }
        return new SuccessFailView(listSysMenuTreeView);

    }


    //公司管理员权限
    @RequestMapping(value = "getSysMenuComAdmin")
    public View getSysMenuComAdmin(HttpServletRequest request,
                                   HttpServletResponse response) throws IOException {

        System.out.println("......................getSysMenuComAdmin");
        List<SysMenu> listSysMenuTreeView = this.sysMenuService.getSysMenuComAdmin();
        PrintWriter out = null;
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            JSONArray array = new JSONArray();
            array = JSONArray.fromObject(listSysMenuTreeView);
            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(array.toString());
            out.flush();
            out.close();
        } finally {
            if (out != null) {
                out.close();
            }
        }
        return new SuccessFailView(listSysMenuTreeView);

    }

    //公司会员权限
    @RequestMapping(value = "getSysMenuComUser")
    public View getSysMenuComUser(HttpServletRequest request,
                                  HttpServletResponse response) throws IOException {

        System.out.println("......................getSysMenuComUser");
        List<SysMenu> listSysMenuTreeView = this.sysMenuService.getSysMenuComUser();
        PrintWriter out = null;
        try {
            response.setCharacterEncoding("utf-8");
            out = response.getWriter();
            JSONArray array = new JSONArray();
            array = JSONArray.fromObject(listSysMenuTreeView);
            response.setContentType("application/text");
            response.setHeader("Cache-Control", "no-store");
            out.write(array.toString());
            out.flush();
            out.close();
        } finally {
            if (out != null) {
                out.close();
            }
        }
        return new SuccessFailView(listSysMenuTreeView);

    }


}
