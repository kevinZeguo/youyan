package com.claude.wmall.shopping.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.sf.json.JSONObject;

import com.claude.wmall.commons.utils.Jsonable;
@Entity
@Table(name = "T_Mb")
public class Mb implements Jsonable {
	
	private int mbId ;
	private String mbName ;
	private MbGroup mbGroupId ;

	@Id
	@Column(name = "mb_id")
	public int getMbId() {
		return mbId;
	}

	public void setMbId(int mbId) {
		this.mbId = mbId;
	}

	@Column(name = "mb_name")
	public String getMbName() {
		return mbName;
	}

	public void setMbName(String mbName) {
		this.mbName = mbName;
	}

	@ManyToOne
	@JoinColumn(name = "mb_group_id")
	public MbGroup getMbGroupId() {
		return mbGroupId;
	}
	
	public void setMbGroupId(MbGroup mbGroupId) {
		this.mbGroupId = mbGroupId;
	}

	@Transient
	@Override
	public String getJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("mbId", getMbId());
		jsonObject.put("mbName", getMbName());
		jsonObject.put("mbGroupId", getMbGroupId());
		return jsonObject.toString();
	}
}
