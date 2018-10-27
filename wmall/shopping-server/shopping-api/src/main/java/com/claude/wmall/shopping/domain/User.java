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
@Table(name = "T_User")
public class User implements Jsonable {
	private java.lang.Integer ID;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	public java.lang.Integer getID() {
		return ID;
	}

	public void setID(java.lang.Integer ID) {
		this.ID = ID;
	}

	private java.lang.String vType;

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

	private java.lang.String vLoginPass;

	@Column(name = "vLoginPass")
	public java.lang.String getvLoginPass() {
		return vLoginPass;
	}

	public void setvLoginPass(java.lang.String vLoginPass) {
		this.vLoginPass = vLoginPass;
	}

	private java.lang.String vArea;

	@Column(name = "vArea")
	public java.lang.String getvArea() {
		return vArea;
	}

	public void setvArea(java.lang.String vArea) {
		this.vArea = vArea;
	}

	private java.lang.String vPhone;

	@Column(name = "vPhone")
	public java.lang.String getvPhone() {
		return vPhone;
	}

	public void setvPhone(java.lang.String vPhone) {
		this.vPhone = vPhone;
	}

	private java.lang.String vQQ;

	@Column(name = "vQQ")
	public java.lang.String getvQQ() {
		return vQQ;
	}

	public void setvQQ(java.lang.String vQQ) {
		this.vQQ = vQQ;
	}

	private java.lang.String vComName;

	@Column(name = "vComName")
	public java.lang.String getvComName() {
		return vComName;
	}

	public void setvComName(java.lang.String vComName) {
		this.vComName = vComName;
	}

	private java.lang.String vPost;

	@Column(name = "vPost")
	public java.lang.String getvPost() {
		return vPost;
	}

	public void setvPost(java.lang.String vPost) {
		this.vPost = vPost;
	}

	private java.math.BigDecimal vMargin;

	@Column(name = "vMargin")
	public java.math.BigDecimal getvMargin() {
		return vMargin;
	}

	public void setvMargin(java.math.BigDecimal vMargin) {
		this.vMargin = vMargin;
	}

	private java.lang.String vState;

	@Column(name = "vState")
	public java.lang.String getvState() {
		return vState;
	}

	public void setvState(java.lang.String vState) {
		this.vState = vState;
	}

	private java.lang.Integer vCompanyID;

	@Column(name = "vCompanyID")
	public java.lang.Integer getvCompanyID() {
		return vCompanyID;
	}

	public void setvCompanyID(java.lang.Integer vCompanyID) {
		this.vCompanyID = vCompanyID;
	}

	private java.util.Date vRegistDate;

	@Column(name = "vRegistDate")
	public java.util.Date getvRegistDate() {
		return vRegistDate;
	}

	public void setvRegistDate(java.util.Date vRegistDate) {
		this.vRegistDate = vRegistDate;
	}

	private java.util.Date vCheckDate;

	@Column(name = "vCheckDate")
	public java.util.Date getvCheckDate() {
		return vCheckDate;
	}

	public void setvCheckDate(java.util.Date vCheckDate) {
		this.vCheckDate = vCheckDate;
	}

	private java.lang.Integer vCheckBy;

	@Column(name = "vCheckBy")
	public java.lang.Integer getvCheckBy() {
		return vCheckBy;
	}

	public void setvCheckBy(java.lang.Integer vCheckBy) {
		this.vCheckBy = vCheckBy;
	}

	private java.lang.String vIdNumber;

	@Column(name = "vIdNumber")
	public java.lang.String getvIdNumber() {
		return vIdNumber;
	}

	public void setvIdNumber(java.lang.String vIdNumber) {
		this.vIdNumber = vIdNumber;
	}

	private java.lang.String vEmail;

	@Column(name = "vEmail")
	public java.lang.String getvEmail() {
		return vEmail;
	}

	public void setvEmail(java.lang.String vEmail) {
		this.vEmail = vEmail;
	}

	private java.lang.String vBusiScope;

	@Column(name = "vBusiScope")
	public java.lang.String getvBusiScope() {
		return vBusiScope;
	}

	public void setvBusiScope(java.lang.String vBusiScope) {
		this.vBusiScope = vBusiScope;
	}

	private java.lang.String vGoal;

	@Column(name = "vGoal")
	public java.lang.String getvGoal() {
		return vGoal;
	}

	public void setvGoal(java.lang.String vGoal) {
		this.vGoal = vGoal;
	}

	private java.lang.String vWXOpenid;

	@Column(name = "vWXOpenid")
	public java.lang.String getvWXOpenid() {
		return vWXOpenid;
	}

	public void setvWXOpenid(java.lang.String vWXOpenid) {
		this.vWXOpenid = vWXOpenid;
	}

    private Integer deptId;//部门Id

    @Column(name = "dept_id")
    public Integer getDeptId() {
        return deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    @Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("ID", getID());
		jsonObject.put("vType", getvType());
		jsonObject.put("vLoginName", getvLoginName());
		jsonObject.put("vRealName", getvRealName());
		jsonObject.put("vLoginPass", getvLoginPass());
		jsonObject.put("vArea", getvArea());
		jsonObject.put("vPhone", getvPhone());
		jsonObject.put("vQQ", getvQQ());
		jsonObject.put("vComName", getvComName());
		jsonObject.put("vPost", getvPost());
		jsonObject.put("vMargin", getvMargin());
		jsonObject.put("vCompanyID", getvCompanyID());
		jsonObject.put("vRegistDate", getvRegistDate());
		jsonObject.put("vCheckDate", getvCheckDate());
		jsonObject.put("vCheckBy", getvCheckBy());
		jsonObject.put("vIdNumber", getvIdNumber());
		jsonObject.put("vEmail", getvEmail());
		jsonObject.put("vBusiScope", getvBusiScope());
		jsonObject.put("vGoal", getvGoal());
		jsonObject.put("vWXOpenid", getvWXOpenid());
		//会员状态：0 未审核，1代表册成功，2有效，3停用，4拒绝
		if("0".equals(getvState())){
			jsonObject.put("vState", "未审核");
		}else if("1".equals(getvState())){
			jsonObject.put("vState", "代表册成功");
		}else if("2".equals(getvState())){
			jsonObject.put("vState", "有效");
		}else if("3".equals(getvState())){
			jsonObject.put("vState", "停用");
		}else{
			jsonObject.put("vState", "拒绝");
		}
		
		return jsonObject.toString();
	}
}
