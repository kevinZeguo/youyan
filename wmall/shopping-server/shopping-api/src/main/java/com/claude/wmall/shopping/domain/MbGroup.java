package com.claude.wmall.shopping.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.sf.json.JSONObject;

import com.claude.wmall.commons.utils.Jsonable;

@Entity
@Table(name = "T_Mb_Group")
public class MbGroup implements Jsonable {
	
	private int mbGroupId ;
	private String mbGroupName ;
	
	@Id
	@Column(name = "mb_group_id")
	public int getMbGroupId() {
		return mbGroupId;
	}

	public void setMbGroupId(int mbGroupId) {
		this.mbGroupId = mbGroupId;
	}

	@Column(name = "mb_group_name")
	public String getMbGroupName() {
		return mbGroupName;
	}

	public void setMbGroupName(String mbGroupName) {
		this.mbGroupName = mbGroupName;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("mbGroupId", getMbGroupId());
		jsonObject.put("mbGroupName", getMbGroupName());
		return jsonObject.toString();
	}
}
