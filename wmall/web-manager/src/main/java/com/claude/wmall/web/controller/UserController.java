package com.claude.wmall.web.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.dao.Constants;
import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.CommonUtil;
import com.claude.wmall.commons.utils.JqGridView;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.shopping.domain.RoleTable;
import com.claude.wmall.shopping.domain.SysMenu;
import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.domain.UserMenu;
import com.claude.wmall.shopping.domain.UserRoleManagerView;
import com.claude.wmall.shopping.service.RoleService;
import com.claude.wmall.shopping.service.SysMenuService;
import com.claude.wmall.shopping.service.UserMenuService;
import com.claude.wmall.shopping.service.UserRoleManagerViewService;
import com.claude.wmall.shopping.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired()
	private UserService userService;
	@Autowired()
	private UserMenuService userMenuService;
	@Autowired()
	private SysMenuService sysMenuService;
	@Autowired
	private UserRoleManagerViewService userRoleManagerService;
	@Autowired
	private RoleService roleService;

	public void setSysMenuService(SysMenuService sysMenuService) {
		this.sysMenuService = sysMenuService;
	}

	public void setUserMenuService(UserMenuService userMenuService) {
		this.userMenuService = userMenuService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	// 跳转注册页面
	@RequestMapping(value = "rRegist")
	public String rRegist() {
		return "user/regist";
	}

	// 跳转到登录页面
	@RequestMapping(value = "rLogin")
	public String rLogin() {
		return "user/login";
	}

	// 退出
	@RequestMapping(value = "quit")
	public String quit(Model model, HttpServletRequest request) {
		request.getSession().invalidate();
		return "user/login";
	}
	
	// 跳转到修页面
	@RequestMapping(value = "rPerUpdate")
	public String rPerUpdate(HttpServletRequest request) {
		System.out.println("rPerUpdate..................");
		User user = (User) request.getSession()
				.getAttribute(Constants.USER_KEY);
		request.setAttribute("user", user);
		return "user/perupdate";
	}

	// 跳转到修改密码页面
	@RequestMapping(value = "rUpdatePass")
	public String rUpdatePass(HttpServletRequest request) {
		User user = (User) request.getSession()
				.getAttribute(Constants.USER_KEY);
		request.setAttribute("user", user);
		return "user/updatePass";
	}
	
	// 个人会员信息修改
	@RequestMapping(value = "perUpdate")
	public String perUpdate(HttpServletRequest request) {
		String realName = request.getParameter("realName");
		String busiScope = request.getParameter("busiScope");
		User user = (User) request.getSession()
				.getAttribute(Constants.USER_KEY);
		if (StringUtils.isNotEmpty(realName)) {
			user.setvRealName(realName);
		}
		if (StringUtils.isNotEmpty(busiScope)) {
			user.setvBusiScope(busiScope);
		}
		userService.save(user);
		return "index.jsp";
	}

	// 密码修改
	@RequestMapping(value = "updatePass")
	public View updatePass(HttpServletRequest request) {
		System.out.println(request.getParameter("newPass"));
		String newPass = CommonUtil.MD5(request.getParameter("newPass"));
		User user = (User) request.getSession()
				.getAttribute(Constants.USER_KEY);
		if (user == null) {
			return new SuccessFailView(true, "密码错误");
		} else {
			user.setvLoginPass(newPass);
			userService.save(user);
			return new SuccessFailView(false, "修改成功");
		}
	}

	// 校验登录名and 个人注册
	@RequestMapping(value = "ajaxRegist")
	public View ajaxLoginName(HttpServletRequest request,
			HttpServletResponse response) {
		// loginName:loginName,idNumber:idNumber,email:email,phone:phone
		String loginName = request.getParameter("loginName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		Map<String, String> result = new HashMap<String, String>();

		if (StringUtils.isNotEmpty(loginName)) {
			if (userService.getUserByName(loginName) != true) {
				result.put("loginName", "exist");
			}
		}
		if (StringUtils.isNotEmpty(idNumber)) {
			if (userService.getUserByIdNumber(idNumber) != true) {
				result.put("idNumber", "exist");
			}
		}
		if (StringUtils.isNotEmpty(email)) {
			if (userService.getUserByEmail(email) != true) {
				result.put("email", "exist");
			}
		}
		if (StringUtils.isNotEmpty(phone)) {
			if (userService.getUserByIdPhone(phone) != true) {
				result.put("phone", "exist");
			}
		}
		if (result.size() != 0) {
			return new SuccessFailView(result);
		} else {
			if (!(StringUtils.isNotEmpty(loginName))
					&& !(StringUtils.isNotEmpty(idNumber))
					&& !(StringUtils.isEmpty(email))
					&& !(StringUtils.isEmpty(idNumber))) {
				return new SuccessFailView(true, "注册失败");
			} else {
				this.regist(request);
				User user = userService.getUsersByName(loginName);
				if (user != null && user.getID() != 0) {
					this.power(user.getID());
				}
				result.put("state", "OK");
			}
		}
		return new SuccessFailView(result);
	}

	// 校验登录名和密码
	@RequestMapping(value = "ajaxLogin")
	public View ajaxLogin(HttpServletRequest request,
			HttpServletResponse response) {
		String loginName = request.getParameter("loginName");
		String loginPass = CommonUtil.MD5(request.getParameter("loginPass"));
		if (StringUtils.isNotEmpty(loginName)
				&& StringUtils.isNotEmpty(loginPass)) {
			User user = userService.getUserByLoginAndPass(loginName, loginPass);
			if (user == null) {
				return new SuccessFailView(false, "用户名或密码错误");
			} else {
				if (user.getvState().equals("0")) {
					return new SuccessFailView(false, "用户名已停用");
				} else {
					request.getSession().setAttribute(Constants.USER_KEY, user);
					return new SuccessFailView(true, "登录成功");
				}
			}
		}
		return new SuccessFailView(false, "用户名或密码不能为空");
	}

	// 注册
	public View regist(HttpServletRequest request) {
		String loginName = request.getParameter("loginName");
		String loginPass = CommonUtil.MD5(request.getParameter("loginPass"));
		String realName = request.getParameter("realName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String QQ = request.getParameter("QQ");
		String area = request.getParameter("area");
		String busiScope = request.getParameter("busiScope");
		String elementType = request.getParameter("elementType");
		Date date = new Date();
		User user = new User();
		user.setvType("3");
		user.setvLoginName(loginName);
		user.setvLoginPass(loginPass);
		user.setvRealName(realName);
		user.setvIdNumber(idNumber);
		user.setvEmail(email);
		user.setvPhone(phone);
		user.setvQQ(QQ);
		user.setvArea(area);
		user.setvRegistDate(date);
		user.setvState("0");
		user.setvBusiScope(busiScope);
		user.setvGoal(elementType);
		userService.save(user);
		return new SuccessFailView(true, "操作成功");
	}

	// 设置个人会员权限
	public void power(int userID) {
		List<SysMenu> sysMenus = sysMenuService.getSysMenuByPerUser();
		for (int i = 0; i < sysMenus.size(); i++) {
			String menusID = sysMenus.get(i).getvMenuID();
			String parentID = sysMenus.get(i).getvParentID();
			UserMenu userMenu = new UserMenu();
			Date date = new Date();
			userMenu.setvInsertDate(date);
			userMenu.setvUserID(userID);
			userMenu.setvMenuID(menusID);
			userMenu.setvParentID(parentID);
			userMenu.setvInsertBy(userID);
			userMenuService.save(userMenu);
		}
	}

	// 跳转到系统管理员的新增页面
	@RequestMapping(value = "rAdminAdd")
	public String rAdminAdd() {
		return "user/adminAdd";
	}

	// 管理员新增ajax校验
	@RequestMapping(value = "ajaxAdminAdd")
	public View ajaxAdminAdd(HttpServletRequest request,
			HttpServletResponse response) {
		// loginName:loginName,idNumber:idNumber,email:email,phone:phone
		String loginName = request.getParameter("loginName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		Map<String, String> result = new HashMap<String, String>();
		if (StringUtils.isNotEmpty(loginName)) {
			if (userService.getUserByName(loginName) != true) {
				result.put("loginName", "exist");
			}
		}
		if (StringUtils.isNotEmpty(idNumber)) {
			if (userService.getUserByIdNumber(idNumber) != true) {
				result.put("idNumber", "exist");
			}
		}
		if (StringUtils.isNotEmpty(email)) {
			if (userService.getUserByEmail(email) != true) {
				result.put("email", "exist");
			}
		}
		if (StringUtils.isNotEmpty(phone)) {
			if (userService.getUserByIdPhone(phone) != true) {
				result.put("phone", "exist");
			}
		}
		if (result.size() != 0) {
			return new SuccessFailView(result);
		} else {
			if (!(StringUtils.isNotEmpty(loginName))
					&& !(StringUtils.isNotEmpty(idNumber))
					&& !(StringUtils.isEmpty(email))
					&& !(StringUtils.isEmpty(idNumber))) {
				return new SuccessFailView(true, "注册失败");
			} else {
				this.regist2(request);
				User user = userService.getUsersByName(loginName);
				if (user.getID() != null || user.getID() != 0) {
					this.power2(user.getID());
				}
				result.put("state", "OK");
			}
		}
		return new SuccessFailView(result);
	}

	// 系统管理员新增
	public View regist2(HttpServletRequest request) {
		String loginName = request.getParameter("loginName");
		String loginPass = CommonUtil.MD5(request.getParameter("loginPass"));
		String realName = request.getParameter("realName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String area = request.getParameter("area");
		Date date = new Date();
		User user = new User();
		user.setvType("2");
		user.setvLoginName(loginName);
		user.setvLoginPass(loginPass);
		user.setvRealName(realName);
		user.setvIdNumber(idNumber);
		user.setvEmail(email);
		user.setvPhone(phone);
		user.setvArea(area);
		user.setvRegistDate(date);
		user.setvState("2");
		userService.save(user);
		return new SuccessFailView(true, "操作成功");
	}

	// 通过session 获得当前人的ID
	// 系统管理员权限
	public void power2(int userID) {
		List<SysMenu> sysMenus = sysMenuService.getSysMenuAdmin();
		for (int i = 0; i < sysMenus.size(); i++) {
			String menusID = sysMenus.get(i).getvMenuID();
			String parentID = sysMenus.get(i).getvParentID();
			UserMenu userMenu = new UserMenu();
			Date date = new Date();
			userMenu.setvInsertDate(date);
			userMenu.setvUserID(userID);
			userMenu.setvMenuID(menusID);
			userMenu.setvParentID(parentID);
			userMenu.setvInsertBy(5);
			userMenuService.save(userMenu);
		}
	}

	// ////////////////////////////////////////wf////////////////////////////////////////////////////////////

	@RequestMapping(value = "manager")
	public String manager(HttpServletRequest re) {
		List<RoleTable> list = roleService.getForSelect();
		re.setAttribute("list", list);
		return "user/UserManager";
	}

	@RequestMapping(value = "list")
	public View list(HttpServletRequest req, Integer page, Integer rows,
			String sidx, String sord) {
		String vLoginName = req.getParameter("vLoginName");
		String vRealName = req.getParameter("vRealName");
		String roleId = req.getParameter("roleId");
		String vState = req.getParameter("vState");
		UserRoleManagerView view = new UserRoleManagerView();
		if (roleId != null && !"".equals(roleId)) {
			view.setRoleId(roleId);
		}
		if (vRealName != null && !"".equals(vRealName)) {
			view.setvRealName(vRealName);
		}
		if (vState != null && !"".equals(vState)) {
			view.setvState(vState);
		}
		if (vLoginName != null && !"".equals(vLoginName)) {
			view.setvLoginName(vLoginName);
		}
		Carrier<UserRoleManagerView> carrier = new Carrier<UserRoleManagerView>(
				page, rows, sidx, sord);
		this.userRoleManagerService.list(carrier, roleId, vRealName,
				vLoginName, vState);
		return new JqGridView<UserRoleManagerView>(carrier);
	}

	@RequestMapping(value = "toadd")
	public String toAdd(HttpServletRequest request) {
		List<RoleTable> list = roleService.getForSelect();
		request.setAttribute("list", list);
		String id = request.getParameter("id");
		System.out.println("===========id==============" + id);
		if (id != null && !"".equals(id)) {
			UserRoleManagerView userrole = this.userRoleManagerService
					.findById(id);
			if (userrole != null) {
				request.setAttribute("loginName", userrole.getvLoginName());
				request.setAttribute("idNumber", userrole.getvIdNumber());
				request.setAttribute("email", userrole.getvEmail());
				request.setAttribute("phone", userrole.getvPhone());
				request.setAttribute("loginpass", userrole.getvLoginPass());
				request.setAttribute("realName", userrole.getvRealName());
				request.setAttribute("roleId", userrole.getRoleId());
				request.setAttribute("state", userrole.getvState());
				request.setAttribute("id", userrole.getId());
			}
		}
		return "user/UserAdd";
	}

	@RequestMapping(value = "userSave")
	public View save(HttpServletRequest request) {
		// System.out.println("userSave");
		String loginName = request.getParameter("loginName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");

		String oldloginName = request.getParameter("oldloginName");
		String oldidNumber = request.getParameter("oldidNumber");
		String oldemail = request.getParameter("oldemail");
		String oldphone = request.getParameter("oldphone");
		Map<String, String> result = new HashMap<String, String>();
		if (loginName.equals(oldloginName)) {
			if (StringUtils.isNotEmpty(loginName)) {
				if (userService.getUserByName(loginName) != true) {
					result.put("loginName", "exist");
				}
			}
		}
		if (idNumber.equals(oldidNumber)) {
			if (StringUtils.isNotEmpty(idNumber)) {
				if (userService.getUserByIdNumber(idNumber) != true) {
					result.put("idNumber", "exist");
				}
			}
		}
		if (email.equals(oldemail)) {
			if (StringUtils.isNotEmpty(email)) {
				if (userService.getUserByEmail(email) != true) {
					result.put("email", "exist");
				}
			}
		}
		if (phone.equals(oldphone)) {
			if (StringUtils.isNotEmpty(phone)) {
				if (userService.getUserByIdPhone(phone) != true) {
					result.put("phone", "exist");
				}
			}
		}
		if (result.size() != 0) {
			return new SuccessFailView(result);
		} else {
			if (!(StringUtils.isNotEmpty(loginName))
					&& !(StringUtils.isNotEmpty(idNumber))
					&& !(StringUtils.isEmpty(email))
					&& !(StringUtils.isEmpty(idNumber))) {
				return new SuccessFailView(true, "注册失败");
			} else {
				this.userSave(request);
				result.put("state", "OK");
			}
		}
		return new SuccessFailView(result);
	}

	// 用户新增
	public View userSave(HttpServletRequest request) {
		String loginName = request.getParameter("loginName");
		String loginPass = CommonUtil.MD5(request.getParameter("loginPass"));
		String realName = request.getParameter("realName");
		String idNumber = request.getParameter("idNumber");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String roleId = request.getParameter("roleId");
		String state = request.getParameter("state");
		String id = request.getParameter("id");
		User user = new User();
		if (id != null && !"".equals(id)) {
			user.setID(Integer.valueOf(id));
		}
		user.setvLoginName(loginName);
		user.setvLoginPass(loginPass);
		user.setvRealName(realName);
		user.setvIdNumber(idNumber);
		user.setvEmail(email);
		user.setvPhone(phone);
		user.setvType(roleId);
		user.setvState(state);
		userService.save(user);
		return new SuccessFailView(true, "操作成功");
	}

	@RequestMapping(value = "start")
	public View start(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String[] arrSelected = ids.split(",");

		if (arrSelected != null && arrSelected.length > 0
				&& StringUtils.isNotEmpty(arrSelected[0])) {
			for (String id : arrSelected) {
				User user = userService.getUserByID(Integer.parseInt(id));
				user.setvState("1");
				userService.save(user);
			}
			return new SuccessFailView(true, "操作成功。");
		}
		return new SuccessFailView(false, "操作失败。");
	}

	@RequestMapping(value = "Bloc")
	public View Bloc(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String[] arrSelected = ids.split(",");

		if (arrSelected != null && arrSelected.length > 0
				&& StringUtils.isNotEmpty(arrSelected[0])) {
			for (String id : arrSelected) {
				User user = userService.getUserByID(Integer.parseInt(id));
				user.setvState("0");
				userService.save(user);
			}
			return new SuccessFailView(true, "操作成功。");
		}
		return new SuccessFailView(false, "操作失败。");
	}

}
