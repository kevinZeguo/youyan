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
@Table(name = "T_CateGory")
public class CateGory implements Jsonable {
	private Integer Id;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Id")
	public Integer getId() {
		return Id;
	}

	public void setId(Integer Id) {
		this.Id = Id;
	}

	private String vCode;

	@Column(name = "vCode")
	public String getvCode() {
		return vCode;
	}

	public void setvCode(String vCode) {
		this.vCode = vCode;
	}

	private String vName;

	@Column(name = "vName")
	public String getvName() {
		return vName;
	}

	public void setvName(String vName) {
		this.vName = vName;
	}

	private String vDepict;

	@Column(name = "vDepict")
	public String getvDepict() {
		return vDepict;
	}

	public void setvDepict(String vDepict) {
		this.vDepict = vDepict;
	}

	private String vImgPath;

	@Column(name = "vImgPath")
	public String getvImgPath() {
		return vImgPath;
	}

	public void setvImgPath(String vImgPath) {
		this.vImgPath = vImgPath;
	}

	private Integer vLevel;

	@Column(name = "vLevel")
	public Integer getvLevel() {
		return vLevel;
	}

	public void setvLevel(Integer vLevel) {
		this.vLevel = vLevel;
	}

	//private java.lang.String vIsParent;

	private boolean isParent;

	@Column(name = "vIsParent")
	public boolean getIsParent() {
		return isParent;
	}

	public void setIsParent(boolean isParent) {
		this.isParent = isParent;
	}

	private String vParentCode;

	@Column(name = "vParentCode")
	public String getvParentCode() {
		return vParentCode;
	}

	public void setvParentCode(String vParentCode) {
		this.vParentCode = vParentCode;
	}

	private String vParentName;

	@Column(name = "vParentName")
	public String getvParentName() {
		return vParentName;
	}

	public void setvParentName(String vParentName) {
		this.vParentName = vParentName;
	}

	private String vStatus;

	@Column(name = "vStatus")
	public String getvStatus() {
		return vStatus;
	}

	public void setvStatus(String vStatus) {
		this.vStatus = vStatus;
	}

	private String vOrderno;

	@Column(name = "vOrderno")
	public String getvOrderno() {
		return vOrderno;
	}

	public void setvOrderno(String vOrderno) {
		this.vOrderno = vOrderno;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("Id", getId());
		jsonObject.put("vCode", getvCode());
		jsonObject.put("vName", getvName());
		jsonObject.put("vDepict", getvDepict());
		jsonObject.put("vImgPath", getvImgPath());
		jsonObject.put("vLevel", getvLevel());
		jsonObject.put("vIsParent", getIsParent());
		jsonObject.put("vParentCode", getvParentCode());
		jsonObject.put("vParentName", getvParentName());
		jsonObject.put("vStatus", getvStatus());
		jsonObject.put("vOrderno", getvOrderno());
		return jsonObject.toString();
	}
}
