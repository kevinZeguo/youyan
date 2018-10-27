package com.claude.wmall.shopping.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.Mb;

public interface MbService extends CrudService<Mb>{

	public void list(Carrier<Mb> carrier, String mbId, String mbName, String mbGroupId);
	
	public Mb findById(int id);
	/**
	 * 通过码表的groupID获取当前码表组数据
	 * 返回 true没有获取到
	 * 返回false获取到当前码表组
	 */
	public boolean getMbGroupId(String mbGroupId);
	
	public List<Mb> findByGroupId(String mbGroupId);

    Mb findByMbName (String mbName);
}
