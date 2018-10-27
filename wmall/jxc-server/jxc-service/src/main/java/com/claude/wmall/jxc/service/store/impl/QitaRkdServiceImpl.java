package com.claude.wmall.jxc.service.store.impl;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.dao.store.StoreQiTaRkdDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.domain.store.StoreQiTaRkd;
import com.claude.wmall.jxc.domain.store.StoreQitaRkdQuery;
import com.claude.wmall.jxc.service.store.QitaRkdService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by mazeguo on 2016/8/28.
 */
@Service
public class QitaRkdServiceImpl implements QitaRkdService {
    @Autowired
    private StoreQiTaRkdDao storeQiTaRkdDao;
    @Autowired
    private StoreKudanDao storeKudanDao;

    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreQiTaRkd> listByPage(StoreQitaRkdQuery query) throws Exception {
        PageHelper.startPage(query.getPage(), query.getRows());
        List<StoreQiTaRkd> list = storeQiTaRkdDao.selectListByPage(query);
        PageInfo<StoreQiTaRkd> page = new PageInfo(list);
        return page;
    }
    @Override
    public StoreQiTaRkd findByDanjubh(String danjubh) throws Exception {
        //查询单据信息
        StoreQiTaRkd rkd = storeQiTaRkdDao.selectByDanjubh(danjubh);
        if (rkd != null) {
            //查询单据流水
            List<StoreChuRuKls> ruKlses = storeChuRuKlsDao.selectByDanjuBh(danjubh);
            rkd.setChuruklsList(ruKlses);
        }
        return rkd;
    }

    @Override
    public void removeDanjubh(String danjubh, Integer userId) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(danjubh);
        //删除采购入库单
        storeQiTaRkdDao.deleteByDanjubh(danjubh);
        //删除入库单
        storeKudanDao.deleteByDanjubh(danjubh);
    }

    @Override
    public void editDanju(StoreQiTaRkd qiTaRkd) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(qiTaRkd.getDanjubh());

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = qiTaRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(qiTaRkd.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

        storeQiTaRkdDao.updateByDanjubh(qiTaRkd);

        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(qiTaRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(qiTaRkd.getDanjurq()) ? qiTaRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(qiTaRkd.getYewuyuan());
        kuCun.setBeizhu(qiTaRkd.getBeizhu());

        storeKudanDao.updateByPrimaryKey(kuCun);

    }

    @Override
    @Transactional
    public void save(StoreQiTaRkd rkd) throws Exception {
        //保存入库单
        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(rkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(rkd.getDanjurq()) ? rkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(rkd.getYewuyuan());
        kuCun.setBeizhu(rkd.getBeizhu());

        storeKudanDao.insert(kuCun);

        rkd.setBanhao(DocuNumber.getMchBillNo());
        //保存采购入库单
        storeQiTaRkdDao.insert(rkd);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = rkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(kuCun.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

    }
}
