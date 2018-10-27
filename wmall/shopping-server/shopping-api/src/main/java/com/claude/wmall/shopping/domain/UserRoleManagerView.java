package com.claude.wmall.shopping.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import net.sf.json.JSONObject;
import com.claude.wmall.commons.utils.Jsonable;

@Entity
@Table(name = "userrolemanagerview")
public class UserRoleManagerView implements Jsonable {
	private java.lang.Integer id;

	
	

	private java.lang.String vType;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	public java.lang.Integer getId() {
		return id;
	}

	public void setId(java.lang.Integer id) {
		this.id = id;
	}

	@Column(name = "vType")
	public java.lang.String getvType() {
		return vType;
	}

	public void setvType(java.lang.String vType) {
		this.vType = vType;
	}

	private java.lang.String vLoginName;

	@Column(name = "vLoginName")
	public java.lang.String getvLoginName() {
		return vLoginName;
	}

	public void setvLoginName(java.lang.String vLoginName) {
		this.vLoginName = vLoginName;
	}

	private java.lang.String vRealName;

	@Column(name = "vRealName")
	public java.lang.String getvRealName() {
		return vRealName;
	}

	public void setvRealName(java.lang.String vRealName) {
		this.vRealName = vRealName;
	}

	private java.lang.String vPhone;

	@Column(name = "vPhone")
	public java.lang.String getvPhone() {
		return vPhone;
	}

	public void setvPhone(java.lang.String vPhone) {
		this.vPhone = vPhone;
	}

	private java.lang.String vEmail;

	@Column(name = "vEmail")
	public java.lang.String getvEmail() {
		return vEmail;
	}

	public void setvEmail(java.lang.String vEmail) {
		this.vEmail = vEmail;
	}

	private java.lang.String vState;

	@Column(name = "vState")
	public java.lang.String getvState() {
		return vState;
	}

	public void setvState(java.lang.String vState) {
		this.vState = vState;
	}

	private java.lang.String vLoginPass;

	@Column(name = "vLoginPass")
	public java.lang.String getvLoginPass() {
		return vLoginPass;
	}

	public void setvLoginPass(java.lang.String vLoginPass) {
		this.vLoginPass = vLoginPass;
	}

	private java.lang.String vWXOpenid;

	@Column(name = "vWXOpenid")
	public java.lang.String getvWXOpenid() {
		return vWXOpenid;
	}

	public void setvWXOpenid(java.lang.String vWXOpenid) {
		this.vWXOpenid = vWXOpenid;
	}

	private java.lang.String roleName;

	
	@Column(name = "ROLE_NAME")
	public java.lang.String getRoleName() {
		return roleName;
	}

	public void setRoleName(java.lang.String roleName) {
		this.roleName = roleName;
	}
	
	private String roleId;
	
	@Column(name = "ROLE_ID")
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	
	private String vIdNumber;
	
	@Column(name = "vIdNumber")
	public String getvIdNumber() {
		return vIdNumber;
	}

	public void setvIdNumber(String vIdNumber) {
		this.vIdNumber = vIdNumber;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", getId());
		jsonObject.put("vType", getvType());
		jsonObject.put("vLoginName", getvLoginName());
		jsonObject.put("vRealName", getvRealName());
		jsonObject.put("vPhone", getvPhone());
		jsonObject.put("vEmail", getvEmail());
		jsonObject.put("vState", getvState());
		jsonObject.put("vLoginPass", getvLoginPass());
		jsonObject.put("vWXOpenid", getvWXOpenid());
		jsonObject.put("roleName", getRoleName());
		jsonObject.put("roleId", getRoleId());
		jsonObject.put("vIdNumber", getvIdNumber());
		return jsonObject.toString();
	}
}
