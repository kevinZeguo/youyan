package com.claude.wmall.web.controller.recManage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.claude.wmall.commons.utils.JqGrid2View;
import com.claude.wmall.commons.utils.SuccessFailView;
import com.claude.wmall.jxc.domain.recManage.Product;
import com.claude.wmall.jxc.service.recManage.ProductService;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/recManage/product/")
public class ProductController {

	private static final Log log = LogFactory.getLog(ProductController.class);

	@Autowired
	private ProductService productService;

	/**
	 * 页面初始化
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "manager")
	public String init(Model model) {
		return "recManage/product/list";
	}

	@RequestMapping(value = "selectProduct")
	public String selectProduct(Model model) {
		return "recManage/product/selectProduct";
	}
	/**
	 * 查询采购入库单列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "list")
	public View list(Product product) {
		
		PageInfo<Product> result = null;
		try {
			result = this.productService.listByPage(product);
		} catch (Exception e) {
			log.error("查询失败", e);
		}
		
		return new JqGrid2View<Product>(result);
	}
	
	/**
	 * 查询采购入库单列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "toadd")
	public String toadd(String code,Model model) {
		if(code != null && !"".equals(code)){
			try{
				Product product = productService.findByCode(code);
				model.addAttribute("product", product);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		
		return "recManage/product/add";
	}
	
	/**
	 * 新增产品信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "save")
	public View save(Product product) {
		try {
			int result = 0;
			if(product.getCode() != null && !"".equals(product.getCode())){
				result = productService.update(product);
			}else{
				result = productService.save(product);
			}
			if(result > 0){
				return new SuccessFailView("OK");
			}else{
				return new SuccessFailView("FILE");
			}
		}catch(Exception e){
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}
	
	/**
	 * 新增产品信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "audit")
	public View audit(String codes,String status) {
		try {
			if(!StringUtils.isEmpty(codes) && !StringUtils.isEmpty(status)){
				String[] code = codes.split(",");
				for (String s : code) {
					Product product = new Product();
					product.setCode(s);
					product.setStatus(status);
					productService.updateStatusByCode(product);
				}
			}
			
			return new SuccessFailView("OK");
		}catch(Exception e){
			e.printStackTrace();
			return new SuccessFailView("FILE");
		}
	}

}
