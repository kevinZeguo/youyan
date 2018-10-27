package com.claude.wmall.jxc.service.store.impl;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.dao.store.StoreShengChanRkdDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.domain.store.StoreShengChanRkd;
import com.claude.wmall.jxc.domain.store.StoreShengchanRkdQuery;
import com.claude.wmall.jxc.service.store.ShengchanRkdService;
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
public class ShengchanRkdServiceImpl implements ShengchanRkdService {
    @Autowired
    private StoreShengChanRkdDao storeShengChanRkdDao;
    @Autowired
    private StoreKudanDao storeKudanDao;

    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;
    @Override
    public PageInfo<StoreShengChanRkd> listByPage(StoreShengchanRkdQuery query) throws Exception {
        PageHelper.startPage(query.getPage(), query.getRows());
        List<StoreShengChanRkd> list = storeShengChanRkdDao.selectListByPage(query);
        PageInfo<StoreShengChanRkd> page = new PageInfo(list);
        return page;
    }


    @Override
    public StoreShengChanRkd findByDanjubh(String danjubh) throws Exception {
        //查询单据信息
        StoreShengChanRkd rkd = storeShengChanRkdDao.selectByDanjubh(danjubh);
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
        storeShengChanRkdDao.deleteByDanjubh(danjubh);
        //删除入库单
        storeKudanDao.deleteByDanjubh(danjubh);
    }

    @Override
    public void editByDanjubh(StoreShengChanRkd storeShengChanRkd) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(storeShengChanRkd.getDanjubh());

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = storeShengChanRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(storeShengChanRkd.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

        storeShengChanRkdDao.updateByDanjubh(storeShengChanRkd);

        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(storeShengChanRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(storeShengChanRkd.getDanjurq()) ? storeShengChanRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(storeShengChanRkd.getYewuyuan());
        kuCun.setBeizhu(storeShengChanRkd.getBeizhu());

        storeKudanDao.updateByPrimaryKey(kuCun);

    }

    @Override
    @Transactional
    public void save(StoreShengChanRkd rkd) throws Exception {
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
        storeShengChanRkdDao.insert(rkd);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = rkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(kuCun.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

    }
}
