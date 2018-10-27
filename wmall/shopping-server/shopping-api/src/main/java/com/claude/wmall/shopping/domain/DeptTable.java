package com.claude.wmall.shopping.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the dept_table database table.
 * 
 */
@Entity
@Table(name="t_dept_table")
public class DeptTable implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="dept_id")
	private int deptId;

	@Column(name="dept_name")
	private String deptName;

	@Column(name="parent_org_id")
	private String parentOrgId;

	@Column(name="dept_person")
	private String deptPerson;

	@Column(name="dept_person_phone")
	private String deptPersonPhone;
	
	@Column(name="dept_status")
	private String deptStatus;
	
	@Column(name="dept_description")
	private String deptDescription;

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getParentOrgId() {
		return parentOrgId;
	}

	public void setParentOrgId(String parentOrgId) {
		this.parentOrgId = parentOrgId;
	}

	public String getDeptPerson() {
		return deptPerson;
	}

	public void setDeptPerson(String deptPerson) {
		this.deptPerson = deptPerson;
	}

	public String getDeptPersonPhone() {
		return deptPersonPhone;
	}

	public void setDeptPersonPhone(String deptPersonPhone) {
		this.deptPersonPhone = deptPersonPhone;
	}

	public String getDeptStatus() {
		return deptStatus;
	}

	public void setDeptStatus(String deptStatus) {
		this.deptStatus = deptStatus;
	}

	public String getDeptDescription() {
		return deptDescription;
	}

	public void setDeptDescription(String deptDescription) {
		this.deptDescription = deptDescription;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}