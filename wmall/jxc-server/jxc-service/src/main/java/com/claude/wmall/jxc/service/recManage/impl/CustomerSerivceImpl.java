package com.claude.wmall.jxc.service.recManage.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.jxc.dao.recManage.CustomerRecDao;
import com.claude.wmall.jxc.dao.recManage.CustomerReceiptDao;
import com.claude.wmall.jxc.domain.recManage.CustomerRec;
import com.claude.wmall.jxc.domain.recManage.CustomerReceipt;
import com.claude.wmall.jxc.service.recManage.CustomerSerivce;
import com.claude.wmall.shopping.domain.Area;
import com.claude.wmall.shopping.service.AreaService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * Created by QinQ on 2016/8/17.
 */
@Service
public class CustomerSerivceImpl implements CustomerSerivce {
	@Autowired
	private CustomerRecDao customerRecDao;

	@Autowired
	private CustomerReceiptDao customerReceiptDao;
	@Autowired
	private AreaService areaService;

	@Override
	public PageInfo<CustomerRec> listByPage(CustomerRec customerRec)
			throws Exception {
		PageHelper.startPage(customerRec.getPage(), customerRec.getRows());
		System.out.println(customerRec.getId());
		System.out.println(customerRec.getName());
		System.out.println(customerRec.getCustomerTypeId());
		System.out.println(customerRec.getAreaProvince());

		System.out.println(customerRec.getAreaCity());
		System.out.println(customerRec.getAreaCounty());
		System.out.println(customerRec.getRegionId());
		System.out.println(customerRec.getApprovalStatus());

		List<CustomerRec> recList = customerRecDao
				.selectListByPage(customerRec);
		if (recList != null && recList.size() > 0) {
			HashMap<String, Area> areaMap = new HashMap<String, Area>();
			for (CustomerRec rec : recList) {
				areaMap.put(rec.getAreaProvince(), new Area());
				areaMap.put(rec.getAreaCity(), new Area());
				areaMap.put(rec.getAreaCounty(), new Area());
			}
			areaMap = (HashMap<String, Area>) areaService
					.getAreaMapByIdMap(areaMap);
			for (CustomerRec rec : recList) {
				String provinceId = rec.getAreaProvince();
				String cityId = rec.getAreaCity();
				String countyId = rec.getAreaCounty();

				String areaFull = nullToBlank(areaMap.get(provinceId)
						.getAreaName())
						+ nullToBlank(areaMap.get(cityId).getAreaName())
						+ nullToBlank(areaMap.get(countyId).getAreaName());
				rec.setAreaFull(areaFull);
			}
		}
		return new PageInfo<CustomerRec>(recList);
	}

	private String nullToBlank(String x) {
		if (x == null)
			return "";
		return x;
	}

	@Override
	public PageInfo<CustomerReceipt> listReceiptAddressByPage(
			CustomerRec customerRec) {
		// TODO Auto-generated method stub
		PageHelper.startPage(customerRec.getPage(), customerRec.getRows());
		return new PageInfo<CustomerReceipt>(
				customerReceiptDao
						.getCustomerReceiptListByCustomerId(customerRec.getId()));

	}

	@Override
	public List<CustomerReceipt> listReceiptAddressByList(
			CustomerRec customerRec) {
		// TODO Auto-generated method stub
		String customerId=customerRec.getId();
		 List<CustomerReceipt> recList =customerReceiptDao
			.getCustomerReceiptListByCustomerId(customerId);
			
			for (CustomerReceipt a : recList) {
				System.out.println("===================11111==================");
				System.out.println(a.getId());
				System.out.println(a.getCustomerId());
				System.out.println(a.getAddressProvince());
				System.out.println(a.getAddressProvinceName());
				System.out.println(a.getAddressCity());
				System.out.println(a.getAddressCityName());
				System.out.println(a.getAddressCounty());
				System.out.println(a.getAddressCountyName());
				System.out.println(a.getAddressfull());
				System.out.println(a.getReceiptplaceId());
				System.out.println(a);


			}
		if (recList != null && recList.size() > 0) {
			HashMap<String, Area> areaMap = new HashMap<String, Area>();
			for (CustomerReceipt rec : recList) {
				areaMap.put(rec.getAddressProvince(), new Area());
				areaMap.put(rec.getAddressCity(), new Area());
				areaMap.put(rec.getAddressCounty(), new Area());
			}
			try {
				areaMap = (HashMap<String, Area>) areaService
						.getAreaMapByIdMap(areaMap);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for (CustomerReceipt rec : recList) {
				String provinceId = rec.getAddressProvince();
				String cityId = rec.getAddressCity();
				String countyId = rec.getAddressCounty();
				rec.setAddressProvinceName(nullToBlank(areaMap.get(provinceId)
						.getAreaName()));
				rec.setAddressCityName(nullToBlank(areaMap.get(cityId).getAreaName()));
				rec.setAddressCountyName(nullToBlank(areaMap.get(countyId).getAreaName()));
				rec.setReceiptplaceName("包头");
			}
		}
		return recList;

	}

	@Override
	public int delByID(String[] ids) {
		// TODO Auto-generated method stub
		System.out.println(ids.length);
		for (String id : ids) {
			customerReceiptDao.deleteByCustomerId(id);
			customerRecDao.deleteByPrimaryKey(id);
		}
		return 1;
	}

	@Override
	public int blockByID(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			System.out.println();
			CustomerRec rec = new CustomerRec();
			rec.setId(id);
			rec.setApprovalStatus(0);
			customerRecDao.updateStatusById(rec);
		}
		return 1;
	}

	@Override
	public int startByID(String[] ids) {
		// TODO Auto-generated method stub
		for (String id : ids) {
			System.out.println(id);
			CustomerRec rec = new CustomerRec();
			rec.setId(id);
			rec.setApprovalStatus(1);
			customerRecDao.updateStatusById(rec);
			System.out.println("over");
		}
		return 1;
	}

	@Override
	public CustomerRec getCustomerRecById(String id) {
		// TODO Auto-generated method stub
		CustomerRec rec = customerRecDao.selectByPrimaryKey(id);
		return rec;
	}

	@Override
	public int save(CustomerRec customerRec) {
		// TODO Auto-generated method stub
		
		
		if(customerRec.getId()==null||"".equals(customerRec.getId())){
			//新建
			System.out.println("YYYYYYYYYYYYY1");
			long id = (new Date()).getTime();
			System.out.println("YYYYYYYYYYYYY2");

			customerRec.setId(String.valueOf(id));
			System.out.println("YYYYYYYYYYYYY3");

			List<CustomerReceipt> receiptList = customerRec.getReceiptList();
			for (CustomerReceipt customerReceipt : receiptList) {
				int idR = (int) (new Date()).getTime();
				customerReceipt.setId(Integer.valueOf(idR));
				customerReceipt.setCustomerId(String.valueOf(id));
				if (customerReceipt.getAddressProvince() == null
						|| "".equals(customerReceipt.getAddressProvince()))
					continue;
				System.out.println("customerReceipt.getCustomerId()"
						+ customerReceipt.getCustomerId());
				System.out.println("customerReceipt.getAddressProvince()"
						+ customerReceipt.getAddressProvince());
				customerReceiptDao.insertSelective(customerReceipt);

			}

			customerRecDao.insert(customerRec);
		}
		

		System.out.println("YYYYYYYYYYYYY4");

		return 0;
	}

	@Override
	public int update(CustomerRec customerRec) {
		// TODO Auto-generated method stub
		//删除地址列表
		customerReceiptDao.deleteByCustomerId(customerRec.getId());
		List<CustomerReceipt> receiptList = customerRec.getReceiptList();
		for (CustomerReceipt customerReceipt : receiptList) {
			int idR = (int) (new Date()).getTime();
			customerReceipt.setId(Integer.valueOf(idR));
			customerReceipt.setCustomerId(customerRec.getId());
			if (customerReceipt.getAddressProvince() == null
					|| "".equals(customerReceipt.getAddressProvince()))
				continue;
			System.out.println("customerReceipt.getCustomerId()"
					+ customerReceipt.getCustomerId());
			System.out.println("customerReceipt.getAddressProvince()"
					+ customerReceipt.getAddressProvince());
			customerReceiptDao.insertSelective(customerReceipt);

		}
		customerRecDao.updateByPrimaryKey(customerRec);

		
		return 0;
	}
}
