package com.claude.wmall.jxc.service.store.impl;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreDiaoBoRkdDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreDiaoBoRkd;
import com.claude.wmall.jxc.domain.store.StoreDiaoboRkdQuery;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.service.store.DiaoboRkdService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/28.
 */
@Service
public class DiaoboRkdServiceImpl implements DiaoboRkdService {
    @Autowired
    private StoreDiaoBoRkdDao storeDiaoBoRkdDao;
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;
    @Autowired
    private StoreKudanDao storeKudanDao;

    @Override
    public PageInfo<StoreDiaoBoRkd> listByPage(StoreDiaoboRkdQuery query) throws Exception {
        PageHelper.startPage(query.getPage(), query.getRows());
        List<StoreDiaoBoRkd> list = storeDiaoBoRkdDao.selectListByPage(query);
        PageInfo<StoreDiaoBoRkd> page = new PageInfo(list);
        return page;
    }

    @Override
    public StoreDiaoBoRkd findByDanjubh(String danjubh) throws Exception {
        StoreDiaoBoRkd rkd = storeDiaoBoRkdDao.selectByDanjubh(danjubh);
        if(rkd != null){
            List<StoreChuRuKls> klses =storeChuRuKlsDao.selectByDanjuBh(danjubh);
            rkd.setChuruklsList(klses);
        }
        return rkd;
    }

    @Override
    public void editDanju(StoreDiaoBoRkd diaoBoRkd) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(diaoBoRkd.getDanjubh());

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = diaoBoRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(diaoBoRkd.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

        storeDiaoBoRkdDao.updateByDanjubh(diaoBoRkd);

        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(diaoBoRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(diaoBoRkd.getDanjurq()) ? diaoBoRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(diaoBoRkd.getYewuyuan());
        kuCun.setBeizhu(diaoBoRkd.getBeizhu());

        storeKudanDao.updateByPrimaryKey(kuCun);
    }

    @Override
    public void save(StoreDiaoBoRkd diaoBoRkd) throws Exception {
        //保存入库单
        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("2");//调拨入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(diaoBoRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(diaoBoRkd.getDanjurq()) ? diaoBoRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(diaoBoRkd.getYewuyuan());
        kuCun.setBeizhu(diaoBoRkd.getBeizhu());

        storeKudanDao.insert(kuCun);

        diaoBoRkd.setBanhao(DocuNumber.getMchBillNo());
        //保存采购入库单
        storeDiaoBoRkdDao.insert(diaoBoRkd);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = diaoBoRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(kuCun.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }
    }

    @Override
    public void removeDanjubh(String danjubh, Integer userId) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(danjubh);
        //删除采购入库单
        storeDiaoBoRkdDao.deleteByDanjubh(danjubh);
        //删除入库单
        storeKudanDao.deleteByDanjubh(danjubh);
    }
}
