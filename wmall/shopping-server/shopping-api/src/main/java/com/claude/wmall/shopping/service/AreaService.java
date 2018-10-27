package com.claude.wmall.shopping.service;


import com.claude.wmall.shopping.domain.Area;

import java.util.List;
import java.util.Map;

/**
 * Created by mazeguo on 2016/8/7.
 * 区域对象操作服务类
 */
public interface AreaService extends CrudService<Area> {

    /**
     * 根据父区域Id查询区域信息
     * @param parentAreaId
     * @param key
     * @return
     * @throws Exception
     */
    List<Area> getListByParId(Integer parentAreaId, String key)throws Exception;

	String getAreaNameById(Integer areaId) throws Exception;

	Map<String, Area> getAreaMapByIdMap(Map<String, Area> idMap)
			throws Exception;

}
