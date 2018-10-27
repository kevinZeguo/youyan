package com.claude.wmall.shopping.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.Mb;
import com.claude.wmall.shopping.service.MbService;

@Service
public class MbServiceImpl extends CrudServiceImpl<Mb> implements MbService {

    public void list(Carrier<Mb> carrier, String mbId, String mbName, String mbGroupId) {
        // TODO Auto-generated method stub
        String hql = "from Mb where 1=1  ";
        if (mbId != null && !"".equals(mbId)) {
            hql += " and mbId = " + mbId;
        }
        if (mbName != null && !"".equals(mbName)) {
            hql += " and mbName like '%" + mbName + "%'";
        }
        if (mbGroupId != null && !"".equals(mbGroupId)) {
            hql += " and mbGroupId = " + mbGroupId;
        }
        hql += " order by mbId asc ";
        this.dao.find(carrier, hql, null);
    }

    public Mb findById(int id) {
        return this.dao.get(id);
    }

    /**
     * 通过码表的groupID获取当前码表组数据
     * 返回 true没有获取到
     * 返回false获取到当前码表组
     */
    public boolean getMbGroupId(String mbGroupId) {
        boolean bool = false;
        String hql = "from Mb where mbGroupId=" + mbGroupId;
        if (this.dao.find(hql, new Object[0]) == null || this.dao.find(hql, new Object[0]).size() == 0) {
            bool = true;
        }
        //返回true可以注册
        return bool;
    }

    @Override
    public List<Mb> findByGroupId(String mbGroupId) {
        String hql = "from Mb where mbGroupId=" + mbGroupId;
        return this.dao.find(hql);
    }

    @Override
    public Mb findByMbName(String mbName) {
        String hql = "from Mb where mbName='" + mbName +"'";
        return (Mb) this.dao.find(hql).get(0);
    }

}
