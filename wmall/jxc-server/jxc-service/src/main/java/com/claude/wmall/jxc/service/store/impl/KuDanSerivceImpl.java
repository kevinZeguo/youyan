package com.claude.wmall.jxc.service.store.impl;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.service.store.KuDanService;
import com.claude.wmall.shopping.domain.User;


/**
 * @author shangchoumeng
 *
 */
@Service
public class KuDanSerivceImpl implements KuDanService {
    @Autowired
    private StoreKudanDao storeKuDanDao;

	@Override
	public int blockByID(String[] ids,User user)  {
		
		for (int i = 0; i < ids.length; i++) {
			try {
				StoreKudan kudan = new StoreKudan();
				kudan.setDanjubh(ids[i]);
				kudan.setShenhebj("2");//审核未通过
				//kudan.setShenher(user.getvLoginName());
				kudan.setShenher("getvLoginName");
				kudan.setShenhesj(new Date(System.currentTimeMillis()));
				storeKuDanDao.updateByPrimaryKeySelective(kudan);
			} catch (Exception e) {
				e.printStackTrace();
			    return 0;
			}
		}
		return 1;
	}

	@Override
	public int startByID(String[] ids,User user) {
		for (int i = 0; i < ids.length; i++) {
			try {
				StoreKudan kudan = new StoreKudan();
				kudan.setDanjubh(ids[i]);
				kudan.setShenhebj("1");//审核通过
				//kudan.setShenher(user.getvLoginName());
				kudan.setShenher("getvLoginName");
				kudan.setShenhesj(new Date(System.currentTimeMillis()));
				storeKuDanDao.updateByPrimaryKeySelective(kudan);
			} catch (Exception e) {
				e.printStackTrace();
			    return 0;
			}
		}
		return 1;
	}

   
}
