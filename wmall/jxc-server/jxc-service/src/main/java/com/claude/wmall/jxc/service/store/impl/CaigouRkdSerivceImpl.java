package com.claude.wmall.jxc.service.store.impl;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreCaiGouRkdDao;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKuCunDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.*;
import com.claude.wmall.jxc.service.store.CaigouRkdSerivce;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by mazeguo on 2016/8/9.
 */
@Service
public class CaigouRkdSerivceImpl implements CaigouRkdSerivce {
    @Autowired
    private StoreCaiGouRkdDao storeCaiGouRkdDao;
    @Autowired
    private StoreKudanDao storeKudanDao;

    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreCaiGouRkd> listByPage(StoreCaiGouRkdQuery query) throws Exception {
        PageHelper.startPage(query.getPage(), query.getRows());
        List<StoreCaiGouRkd> list = storeCaiGouRkdDao.selectListByPage(query);
        PageInfo<StoreCaiGouRkd> page = new PageInfo(list);
        return page;
    }

    @Override
    @Transactional
    public void save(StoreCaiGouRkd storeCaiGouRkd) throws Exception {
        //保存入库单
        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(storeCaiGouRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(storeCaiGouRkd.getDanjurq()) ? storeCaiGouRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(storeCaiGouRkd.getYewuyuan());
        kuCun.setBeizhu(storeCaiGouRkd.getBeizhu());

        storeKudanDao.insert(kuCun);

        storeCaiGouRkd.setBanhao(DocuNumber.getMchBillNo());
        //保存采购入库单
        storeCaiGouRkdDao.insert(storeCaiGouRkd);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = storeCaiGouRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(kuCun.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

    }

    @Override
    public StoreCaiGouRkd findByDanjubh(String danjubh) throws Exception {
        //查询单据信息
        StoreCaiGouRkd rkd = storeCaiGouRkdDao.selectByDanjubh(danjubh);
        if (rkd != null) {
            //查询单据流水
            List<StoreChuRuKls> ruKlses = storeChuRuKlsDao.selectByDanjuBh(danjubh);
            if (ruKlses != null) {
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                for (StoreChuRuKls kls : ruKlses) {
                    if (kls.getShengchanrq() != null) {
                        kls.setShengchanrq(df.format(kls.getShengchanrq()));
                    }
                }
            }
            rkd.setChuruklsList(ruKlses);
        }
        return rkd;
    }

    @Override
    public void removeDanjubh(String danjubh, Integer userId) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(danjubh);
        //删除采购入库单
        storeCaiGouRkdDao.deleteByDanjubh(danjubh);
        //删除入库单
        storeKudanDao.deleteByDanjubh(danjubh);
    }

    @Override
    public void editDanju(StoreCaiGouRkd storeCaiGouRkd) throws Exception {
        //删除单据流水
        storeChuRuKlsDao.deleteByDanjubh(storeCaiGouRkd.getDanjubh());

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = storeCaiGouRkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(storeCaiGouRkd.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

        storeCaiGouRkdDao.updateByDanjubh(storeCaiGouRkd);

        StoreKudan kuCun = new StoreKudan();
        kuCun.setKudanlx("1");//入库
        kuCun.setRukulx("1");//采购入库
        kuCun.setShenhebj("0");
        kuCun.setDanjubh(storeCaiGouRkd.getDanjubh());
        kuCun.setDanjurq(StringUtils.isNotEmpty(storeCaiGouRkd.getDanjurq()) ? storeCaiGouRkd.getDanjurq().replace("-", "") : "");
        kuCun.setYewuyuan(storeCaiGouRkd.getYewuyuan());
        kuCun.setBeizhu(storeCaiGouRkd.getBeizhu());

        storeKudanDao.updateByPrimaryKey(kuCun);

    }
}
