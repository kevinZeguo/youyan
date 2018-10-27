package com.claude.wmall.jxc.service.store.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.dao.store.StoreYiKuDDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.domain.store.StoreYiKuD;
import com.claude.wmall.jxc.service.store.YikudService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


/**
 * @author shangchoumeng
 *
 */
@Service
public class YikudSerivceImpl   implements YikudService {
    @Autowired
    private StoreYiKuDDao storeYiKuDDao;
    
    @Autowired
    private StoreKudanDao storeKudanDao;
    
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreYiKuD> listByPage(StoreYiKuD query) throws Exception {
    	PageHelper.startPage(query.getPage(),query.getRows());
        return new PageInfo<StoreYiKuD>(storeYiKuDDao.selectListByPage(query));
    }

	@Override
	public void save(StoreYiKuD storeYiKuD) throws Exception {
		 //保存库单
        StoreKudan kuDan = new StoreKudan();
        kuDan.setKudanlx("-1");//出库
        kuDan.setRukulx(storeYiKuD.getKudanlx());//库单类型
        kuDan.setShenhebj("0");
        kuDan.setDanjubh(storeYiKuD.getDanjubh());
        kuDan.setDanjurq(StringUtils.isNotEmpty(storeYiKuD.getDanjurq()) ? storeYiKuD.getDanjurq().replace("-", "") : "");
        kuDan.setBeizhu(storeYiKuD.getBeizhu());
        storeKudanDao.insert(kuDan);

        
        
        storeYiKuD.setBanhao(DocuNumber.getMchBillNo());
        //保存出库单
        storeYiKuDDao.insert(storeYiKuD);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = storeYiKuD.getChuruklsList();
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
				
				StoreYiKuD kd = storeYiKuDDao.selectByPrimaryKey(Long.valueOf(ids[i]));
				storeYiKuDDao.deleteByPrimaryKey(Long.valueOf(ids[i]));
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
