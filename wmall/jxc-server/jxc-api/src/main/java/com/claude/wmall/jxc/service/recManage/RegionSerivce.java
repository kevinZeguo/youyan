package com.claude.wmall.jxc.service.recManage;

import java.util.List;

import com.claude.wmall.jxc.domain.recManage.RegionRec;
import com.github.pagehelper.PageInfo;

/**
 * Created by QinQ on 2016/8/19.
 */
public interface RegionSerivce {
    /**
     * 分页查询大区档案
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<RegionRec> listByPage(RegionRec regionRec)throws Exception;

	List<RegionRec> findAll();
	
	List<RegionRec> findUserListByRoleName(String roleName)throws Exception;
}
