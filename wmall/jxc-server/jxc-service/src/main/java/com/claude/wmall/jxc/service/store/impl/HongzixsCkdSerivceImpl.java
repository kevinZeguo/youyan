package com.claude.wmall.jxc.service.store.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreHongZiXsckdDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreHongZiXsckd;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.service.store.HongzixsCkdService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


/**
 * @author shangchoumeng
 *
 */
@Service
public class HongzixsCkdSerivceImpl   implements HongzixsCkdService {
    @Autowired
    private StoreHongZiXsckdDao storeHongZiXsckdDao;
    
    @Autowired
    private StoreKudanDao storeKudanDao;
    
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreHongZiXsckd> listByPage(StoreHongZiXsckd query) throws Exception {
    	PageHelper.startPage(query.getPage(),query.getRows());
        return new PageInfo<StoreHongZiXsckd>(storeHongZiXsckdDao.selectListByPage(query));
    }

	@Override
	public void save(StoreHongZiXsckd storeHongZiXsckd) throws Exception {

		 //保存库单
       StoreKudan kuDan = new StoreKudan();
       kuDan.setKudanlx("-1");//出库
       kuDan.setRukulx(storeHongZiXsckd.getKudanlx());//库单类型
       kuDan.setShenhebj("0");
       kuDan.setDanjubh(storeHongZiXsckd.getDanjubh());
       kuDan.setDanjurq(StringUtils.isNotEmpty(storeHongZiXsckd.getDanjurq()) ? storeHongZiXsckd.getDanjurq().replace("-", "") : "");
       kuDan.setBeizhu(storeHongZiXsckd.getBeizhu());
       storeKudanDao.insert(kuDan);

       
       
       storeHongZiXsckd.setBanhao(DocuNumber.getMchBillNo());
       //保存出库单
       storeHongZiXsckdDao.insert(storeHongZiXsckd);

       //保存流水明细
       List<StoreChuRuKls> ruKlsList = storeHongZiXsckd.getChuruklsList();
       for (StoreChuRuKls kls : ruKlsList) {
           kls.setLiushuih((int) DocuNumber.getMchBillNo());
           kls.setDanjubh(kuDan.getDanjubh());
           storeChuRuKlsDao.insert(kls);
       }
		
	
		
	}

	@Override
	public int del(String[] ids) throws Exception {
		for (int i = 0; i < ids.length; i++) {
			try {
				
				StoreHongZiXsckd kd = storeHongZiXsckdDao.selectByPrimaryKey(Long.valueOf(ids[i]));
				storeHongZiXsckdDao.deleteByPrimaryKey(Long.valueOf(ids[i]));
				storeKudanDao.deleteByPrimaryKey(kd.getDanjubh());
				storeChuRuKlsDao.deleteByKey(kd.getDanjubh());
				
			} catch (Exception e) {
				e.printStackTrace();
			    return 0;
			}
		}
		return 1;
	}
}
