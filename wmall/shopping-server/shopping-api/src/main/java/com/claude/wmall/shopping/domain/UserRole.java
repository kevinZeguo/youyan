package com.claude.wmall.shopping.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the user_role database table.
 * 
 */
@Entity
@Table(name="user_role")
public class UserRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="USER_ROLE_ID")
	private int userRoleId;

	//bi-directional many-to-one association to RoleTable
	@ManyToOne
	@JoinColumn(name="ROLE_ID")
	private RoleTable roleTable;

	//bi-directional many-to-one association to UserTable
	@ManyToOne
	@JoinColumn(name="USER_ID")
	private UserTable userTable;

	public UserRole() {
	}

	public int getUserRoleId() {
		return this.userRoleId;
	}

	public void setUserRoleId(int userRoleId) {
		this.userRoleId = userRoleId;
	}

	public RoleTable getRoleTable() {
		return this.roleTable;
	}

	public void setRoleTable(RoleTable roleTable) {
		this.roleTable = roleTable;
	}

	public UserTable getUserTable() {
		return this.userTable;
	}

	public void setUserTable(UserTable userTable) {
		this.userTable = userTable;
	}

}