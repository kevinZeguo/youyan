package com.claude.wmall.shopping.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the role_table database table.
 * 
 */
@Entity
@Table(name="role_table")
public class RoleTable implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ROLE_ID")
	private int roleId;

	@Column(name="ROLE_NAME")
	private String roleName;

	//bi-directional many-to-one association to UserRole
	@OneToMany(mappedBy="roleTable")
	private List<UserRole> userRoles;

	public RoleTable() {
	}

	public int getRoleId() {
		return this.roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<UserRole> getUserRoles() {
		return this.userRoles;
	}

	public void setUserRoles(List<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

}