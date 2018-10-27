package com.claude.wmall.jxc.service.recManage.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.jxc.dao.recManage.RegionRecDao;
import com.claude.wmall.jxc.domain.recManage.RegionRec;
import com.claude.wmall.jxc.service.recManage.RegionSerivce;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * Created by QinQ on 2016/8/17.
 */
@Service
public class RegionSerivceImpl implements RegionSerivce {
	@Autowired
	private RegionRecDao regionDao;

	@Override
	public PageInfo<RegionRec> listByPage(RegionRec regionRec) throws Exception {
		PageHelper.startPage(regionRec.getPage(), regionRec.getRows());
		return new PageInfo<RegionRec>(regionDao.selectListByPage(regionRec));
	}

	@Override
	public List<RegionRec> findAll() {
		System.out.println("555555555555");
		return regionDao.getAll();
	}
	
	/* (non-Javadoc)
	 * @see com.claude.wmall.jxc.service.recManage.RegionSerivce#findUserListByRoleName(java.lang.String)
	 */
	@Override
	public List<RegionRec> findUserListByRoleName(String roleName) throws Exception {
		return regionDao.selectByRoleName(roleName);
	}
}
