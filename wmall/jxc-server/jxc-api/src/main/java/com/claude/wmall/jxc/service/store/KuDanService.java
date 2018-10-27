package com.claude.wmall.jxc.service.store;

import java.util.concurrent.ExecutionException;

import com.claude.wmall.shopping.domain.User;


public interface KuDanService {
     
	 /**
     * 反审
     * @param ids
     * @return
     */
    int blockByID(String[] ids,User user) throws ExecutionException;
	/**
	 * 审核
	 * @param ids
	 * @return
	 */
	int startByID(String[] ids,User user)throws ExecutionException;
}
