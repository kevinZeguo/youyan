package com.claude.wmall.shopping.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the user_table database table.
 * 
 */
@Entity
@Table(name="user_table")
public class UserTable implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="USER_ID")
	private int userId;

	@Column(name="USER_NAME")
	private String userName;

	@Column(name="USER_PASSWROD")
	private String userPasswrod;

	@Column(name="USER_STATUS")
	private String userStatus;

	@Column(name="WECHAT_ID")
	private String wechatId;

	@Column(name="WECHAT_NAME")
	private String wechatName;

	//bi-directional many-to-one association to UserRole
	@OneToMany(mappedBy="userTable")
	private List<UserRole> userRoles;

	//bi-directional many-to-one association to DeptTable
	@ManyToOne
	@JoinColumn(name="DEPT_ID")
	private DeptTable deptTable;

	public UserTable() {
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPasswrod() {
		return this.userPasswrod;
	}

	public void setUserPasswrod(String userPasswrod) {
		this.userPasswrod = userPasswrod;
	}

	public String getUserStatus() {
		return this.userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getWechatId() {
		return this.wechatId;
	}

	public void setWechatId(String wechatId) {
		this.wechatId = wechatId;
	}

	public String getWechatName() {
		return this.wechatName;
	}

	public void setWechatName(String wechatName) {
		this.wechatName = wechatName;
	}

	public List<UserRole> getUserRoles() {
		return this.userRoles;
	}

	public void setUserRoles(List<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	public DeptTable getDeptTable() {
		return this.deptTable;
	}

	public void setDeptTable(DeptTable deptTable) {
		this.deptTable = deptTable;
	}

}