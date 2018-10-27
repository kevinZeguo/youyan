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
@Table(name = "T_ORGAN")
public class Organ implements Jsonable {
	private java.lang.Integer id;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public java.lang.Integer getid() {
		return id;
	}

	public void setid(java.lang.Integer id) {
		this.id = id;
	}

	private java.lang.String vName;

	@Column(name = "vName")
	public java.lang.String getvName() {
		return vName;
	}

	public void setvName(java.lang.String vName) {
		this.vName = vName;
	}

	private java.lang.String vPhone;

	@Column(name = "vPhone")
	public java.lang.String getvPhone() {
		return vPhone;
	}

	public void setvPhone(java.lang.String vPhone) {
		this.vPhone = vPhone;
	}

	private java.lang.String vPerson;

	@Column(name = "vPerson")
	public java.lang.String getvPerson() {
		return vPerson;
	}

	public void setvPerson(java.lang.String vPerson) {
		this.vPerson = vPerson;
	}

	private java.lang.String vLicense;

	@Column(name = "vLicense")
	public java.lang.String getvLicense() {
		return vLicense;
	}

	public void setvLicense(java.lang.String vLicense) {
		this.vLicense = vLicense;
	}

	private java.lang.String vOpenName;

	@Column(name = "vOpenName")
	public java.lang.String getvOpenName() {
		return vOpenName;
	}

	public void setvOpenName(java.lang.String vOpenName) {
		this.vOpenName = vOpenName;
	}

	private java.lang.String vOpenNumber;

	@Column(name = "vOpenNumber")
	public java.lang.String getvOpenNumber() {
		return vOpenNumber;
	}

	public void setvOpenNumber(java.lang.String vOpenNumber) {
		this.vOpenNumber = vOpenNumber;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", getid());
		jsonObject.put("vName", getvName());
		jsonObject.put("vPhone", getvPhone());
		jsonObject.put("vPerson", getvPerson());
		jsonObject.put("vLicense", getvLicense());
		jsonObject.put("vOpenName", getvOpenName());
		jsonObject.put("vOpenNumber", getvOpenNumber());
		return jsonObject.toString();
	}
}
