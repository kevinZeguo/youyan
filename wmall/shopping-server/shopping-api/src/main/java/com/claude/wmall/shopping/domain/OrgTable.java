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
@Table(name = "t_org_table")
public class OrgTable implements Jsonable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id")
	private Integer orgId ;

    @Column(name = "org_name")
    private String orgName ;

    @Column(name = "parent_id")
    private String parentId ;

    @Column(name = "org_description")
    private String orgDescription ;
    
    @Column(name = "org_person")
    private String orgPerson ;
    
    @Column(name = "org_person_phone")
    private String orgPersonPhone ;
    
    @Column(name = "org_status")
    private String orgStatus ;

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getOrgDescription() {
        return orgDescription;
    }

    public void setOrgDescription(String orgDescription) {
        this.orgDescription = orgDescription;
    }

    public String getOrgPerson() {
		return orgPerson;
	}

	public void setOrgPerson(String orgPerson) {
		this.orgPerson = orgPerson;
	}

	public String getOrgPersonPhone() {
		return orgPersonPhone;
	}

	public void setOrgPersonPhone(String orgPersonPhone) {
		this.orgPersonPhone = orgPersonPhone;
	}

	public String getOrgStatus() {
		return orgStatus;
	}

	public void setOrgStatus(String orgStatus) {
		this.orgStatus = orgStatus;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("orgId", getOrgId());
        jsonObject.put("orgName", getOrgName());
        return jsonObject.toString();
	}
}
