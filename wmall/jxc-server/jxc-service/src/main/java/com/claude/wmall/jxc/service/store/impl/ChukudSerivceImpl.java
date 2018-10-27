package com.claude.wmall.jxc.service.store.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuKuDDao;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.StoreChuKuD;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.service.store.ChukudService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


/**
 * @author shangchoumeng
 *
 */
@Service
public class ChukudSerivceImpl   implements ChukudService {
    @Autowired
    private StoreChuKuDDao storeChuKuDDao;
    
    @Autowired
    private StoreKudanDao storeKudanDao;
    
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreChuKuD> listByPage(StoreChuKuD query) throws Exception {
    	PageHelper.startPage(query.getPage(),query.getRows());
        return new PageInfo<StoreChuKuD>(storeChuKuDDao.selectListByPage(query));
    }

	@Override
	public void save(StoreChuKuD StoreChuKuD) throws Exception {
		 //保存入库单
        StoreKudan kuDan = new StoreKudan();
        kuDan.setKudanlx("-1");//出库
        kuDan.setRukulx(StoreChuKuD.getKudanlx());//库单类型
        kuDan.setShenhebj("0");
        kuDan.setDanjubh(StoreChuKuD.getDanjubh());
        kuDan.setDanjurq(StringUtils.isNotEmpty(StoreChuKuD.getDanjurq()) ? StoreChuKuD.getDanjurq().replace("-", "") : "");
        kuDan.setBeizhu(StoreChuKuD.getBeizhu());

        storeKudanDao.insert(kuDan);

        StoreChuKuD.setBanhao(DocuNumber.getMchBillNo());
        //保存采购入库单
        storeChuKuDDao.insert(StoreChuKuD);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = StoreChuKuD.getChuruklsList();
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
				
				StoreChuKuD kd = storeChuKuDDao.selectByPrimaryKey(Long.valueOf(ids[i]));
				storeChuKuDDao.deleteByPrimaryKey(Long.valueOf(ids[i]));
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
