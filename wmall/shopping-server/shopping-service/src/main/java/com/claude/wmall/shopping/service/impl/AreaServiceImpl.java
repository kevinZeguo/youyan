package com.claude.wmall.shopping.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.Area;
import com.claude.wmall.shopping.service.AreaService;

/**
 * Created by mazeguo on 2016/8/7.
 */
@Service
public class AreaServiceImpl extends CrudServiceImpl<Area> implements
		AreaService {

	@Override
	public List<Area> getListByParId(Integer parentAreaId, String key)
			throws Exception {
		if (parentAreaId == null) {// 区域Id为空，则默认为一级区域信息
			parentAreaId = 0;
		}

		List<Area> areaList = null;

		String hql = "from Area where areaPar=" + parentAreaId;
		if (StringUtils.isNotEmpty(key)) {
			hql += " and areaName like '%" + key + "%'";
		}
		areaList = this.dao.find(hql, new Object[0]);
		return areaList;
	}

	@Override
	public Map<String, Area> getAreaMapByIdMap(Map<String, Area> idMap)
			throws Exception {
		if (idMap == null) {// 区域Id为空，则默认为一级区域信息
			return null;
		}
		String hql = "from Area where areaId in(";
		Iterator<String> it = idMap.keySet().iterator();
		while (it.hasNext()) {
			String id = it.next();
			hql = hql + id + ",";

		}
		hql = hql.substring(0, hql.length() - 1) + ")";
		System.out.println("hql===========" + hql);
		List<Area> areaList = null;
		areaList = this.dao.find(hql, new Object[0]);
		for (Area area : areaList) {
			String id = area.getAreaId().toString();
			idMap.put(id, area);
		}
		return idMap;
	}

	@Override
	public String getAreaNameById(Integer areaId) throws Exception {
		if (areaId == null) {// 区域Id为空，则默认为一级区域信息
			areaId = 0;
		}

		String hql = "from Area where areaId='" + areaId + "'";
		Area result = this.dao.findUniqueBy("areaId", areaId);
		if (result != null) {
			return result.getAreaName();
		} else {
			return "";
		}
	}
}
