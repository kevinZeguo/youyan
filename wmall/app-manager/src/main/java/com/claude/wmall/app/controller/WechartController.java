package com.claude.wmall.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.claude.wmall.shopping.service.WechartService;

@Controller()
@RequestMapping("/wechart")
public class WechartController {

	/* @Autowired
	private CodingRuleService codingRuleService;

	public void setCodingRuleService(CodingRuleService codingRuleService) {
		this.codingRuleService = codingRuleService;
	}

	@Autowired
	private OrderBodyService orderBodyService;

	public void setOrderBodyService(OrderBodyService orderBodyService) {
		this.orderBodyService = orderBodyService;
	}
*/
	@Autowired
	private WechartService wechartService;

	public void setWechartService(WechartService wechartService) {
		this.wechartService = wechartService;
	}

	/*@Autowired
	private ProductTableService productService;

	public void setProductService(ProductTableService productService) {
		this.productService = productService;
	}
	@Autowired
	private CustomerLevelService customerLevelService;

	public void setCustomerLevelService(CustomerLevelService customerLevelService) {
		this.customerLevelService = customerLevelService;
	}
	@Autowired
	private PayLogWXService payLogWXService;

	public void setPayLogWXService(PayLogWXService payLogWXService) {
		this.payLogWXService = payLogWXService;
	}

	@Autowired
	private OrderHeadService orderHeadService;

	public void setOrderHeadService(OrderHeadService orderHeadService) {
		this.orderHeadService = orderHeadService;
	}

	@Autowired
	private ProductTypeService productTypeService;

	public void setProductTypeService(ProductTypeService productTypeService) {
		this.productTypeService = productTypeService;
	}

	@Autowired
	private ProductViewService productViewService;

	public void setProductViewService(ProductViewService productViewService) {
		this.productViewService = productViewService;
	}

	@Autowired
	private SignTableService signTableService;

	public void setSignTableService(SignTableService signTableService) {
		this.signTableService = signTableService;
	}

	@Autowired
	private CustomerTableService customerTableService;

	public void setCustomerTableService(
			CustomerTableService customerTableService) {
		this.customerTableService = customerTableService;
	}

	@Autowired
	private GerenViewService gerenViewService;

	public void setGerenViewService(GerenViewService gerenViewService) {
		this.gerenViewService = gerenViewService;
	}
	
	@Autowired
	private CardDetailService cardDetailService;

	public void setCardDetailService(CardDetailService cardDetailService) {
		this.cardDetailService = cardDetailService;
	}

	@Autowired
	private CustomerTypeService customerTypeService;

	public void setCustomerTypeService(CustomerTypeService customerTypeService) {
		this.customerTypeService = customerTypeService;
	}

	@Autowired
	private CardTableService cardTableService;

	public void setCardTableService(CardTableService cardTableService) {
		this.cardTableService = cardTableService;
	}
	
	@Autowired
	private CommentsService commentsService;
	
	public void setCommentsService(CommentsService commentsService) {
		this.commentsService = commentsService;
	}
	
	@Autowired
	private AppUserService appUserService;

	public void setAppUserService(AppUserService appUserService) {
		this.appUserService = appUserService;
	}
	
	@Autowired
	private CustomerTableTempService customerTableTempService;

	public void setCustomerTableTempService(
			CustomerTableTempService customerTableTempService) {
		this.customerTableTempService = customerTableTempService;
	}*/

	@RequestMapping(value = "login")
	public String login() {
		return "mobile/login";
	}

	@RequestMapping(value = "index")
	public String index() {
		return "mobile/index";
	}

	/*@RequestMapping(value = "oauth2")
	public View list(HttpServletRequest request) {
		HttpSession session = request.getSession();
		//CustomerTable customerTable = (CustomerTable) session.getAttribute("customerTable");

		// CustomerTable customerTable = null;
		// CustomerTable customer=null;
		try {
			String type = request.getParameter("type");
			String code = request.getParameter("code");
			System.out.println("code=====>>>>>>>" + code);
			System.out.println("type=====>>>>>>>" + type);
			String userid = request.getParameter("username");
			System.out
					.println("userid=============>>>>>>>>>>>>>>>>>>" + userid);
			if (userid != null && !"".equals(userid)) {
				System.out.println("userid----------------" + userid);
				System.out.println("============闇�眰鐨勪笟鍔￠�杈�==============");
				// session.setAttribute("superId", userid);
				session.setAttribute("superId", userid);
				// Vip vip = vipService.load(userid);
				// if(vip!=null){
				// System.out.println(vip.getVipname());
				// shopname= vip.getVipname();
				// }else{
				// Agent agent = agentService.load(userid);
				// if(agent!=null){
				// System.out.println(agent.getName());
				// shopname= agent.getName();
				// }
				// }
				System.out.println("");
			}
			
			 * else { session.setAttribute("superId", ""); }
			 // 鍒嗘垚璐拱鍚庣户缁喘涔板張缁х画鍒嗘垚
			if (type != null && !"".equals(type)) {
				System.out.println("楠岃瘉寰俊娣诲姞鏁版嵁");
				String oauth2accesstoken = this.wechartService
						.getoauth2accesstoken(code);
				JSONObject jsonObject = new JSONObject(oauth2accesstoken);
				String accesstoken = jsonObject.getString("access_token");
				String openid = jsonObject.getString("openid");
				System.out.println("openid=================" + openid);
				String userinfo = this.wechartService.getUserinfo(accesstoken,
						openid);
				System.out.println("userinfo========?>>>>>>>>>" + userinfo);
				JSONObject object = new JSONObject(userinfo);
				String nickname = object.getString("nickname");
				String city = object.getString("city");
				String headimgurl = object.getString("headimgurl");
				AppUser user = this.appUserService.findByOpenid(openid);
				String wename = EmojiFilter.filterEmoji(nickname);
				if (user == null) {
					user = new AppUser();
					user.setCity(city);
					user.setHeadimgurl(headimgurl);
					user.setNickname(wename);
					user.setOpenid(openid);
					this.appUserService.save(user);
				}

			}
			if (customerTable == null) {
				// System.out.println("name============"+customerTable.getWechatName());
				String oauth2accesstoken = this.wechartService
						.getoauth2accesstoken(code);
				JSONObject jsonObject = new JSONObject(oauth2accesstoken);
				String accesstoken = jsonObject.getString("access_token");
				String openid = jsonObject.getString("openid");
				System.out.println("openid=================" + openid);
				String userinfo = this.wechartService.getUserinfo(accesstoken,
						openid);
				System.out.println("userinfo========?>>>>>>>>>" + userinfo);
				JSONObject object = new JSONObject(userinfo);
				String nickname = object.getString("nickname");
				String city = object.getString("city");
				String headimgurl = object.getString("headimgurl");
				// customerTable = new CustomerTable();
				customerTable = this.customerTableService
						.findByWechatId(openid);
				if (customerTable == null) {
					customerTable = new CustomerTable();
					customerTable.setWechatId(openid);
					String wename = EmojiFilter.filterEmoji(nickname);
					customerTable.setCity(city);
					customerTable.setHeadimgurl(headimgurl);
					System.out.println("nickname=====================>>>>>>>"
							+ wename);
					customerTable.setWechatName(wename);
					System.out.println(">>>>>>>>>>>>>"
							+ customerTable.getWechatId());
					customerTable.setCustomerType(this.customerTypeService.findById(4));
					customerTable.setCustomerLevel(this.customerLevelService.get(15));
					System.out
							.println("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
					this.customerTableService.save(customerTable);
					session.setAttribute("customerTable", customerTable);
				} else {
					System.out
							.println("22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222");
					session.setAttribute("customerTable", customerTable);
				}

				// user.setNickname(new String(nickname.getBytes("ISO-8859-1"),
				// "UTF-8"));
				// user.setCity(new String(city.getBytes("ISO-8859-1"),
				// "UTF-8"));
				// customerTable.setCity(city);
				// user.setHeadimgurl(headimgurl);
			}
			 * else{ customerTable =
			 * this.customerTableService.findByWechatId(customerTable
			 * .getWechatId()); System.out.println(
			 * "33333333333333333333333333333333333333333333333333333333333333333333333333333"
			 * ); if(customerTable != null){ System.out.println(
			 * "4444444444444444444444444444444444444444444444444444444444444444444444444444444"
			 * ); session.setAttribute("customerTable", customerTable); } }
			 
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView("");
		}

		return new SuccessFailView(customerTable);
	}
	
	
	@RequestMapping(value = "superId")
	public View superId(HttpServletRequest req){
		HttpSession session = req.getSession();
		String superId = (String) session.getAttribute("superId");
		return new SuccessFailView(superId);
	}
	
	@RequestMapping(value = "customerList")
	public View customerList(HttpServletRequest req) {
		CustomerTable customer = new CustomerTable();
		try {
           String wechatId = req.getParameter("wechatId");
			//String wechatId ="oR38vwZfzl-KrLYv1mEY9SKIvOeg";
			System.out.println("wechatId===========================" + wechatId);
			 customer = this.customerTableService.findByWechatId(wechatId);
			//System.out.println("getCustomerName====================="+customer.getCustomerName());
			//if (customer == null) {
				//System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
			//	return new SuccessFailView("");
		//	}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new SuccessFailView(customer);
	}
	
	
	

	@RequestMapping(value = "getUser")
	public View getUser(HttpServletRequest request) {
		HttpSession session = request.getSession();
		CustomerTable customerTable = (CustomerTable) session
				.getAttribute("customerTable");

//		CustomerTable customerTable = new CustomerTable();
//		customerTable.setWechatId("oIgnNwvI8aNUQeZNWJgNr44PZEI8");
//		customerTable.setWechatName("鐜嬩笁鐭�);
//		customerTable.setHeadimgurl("http://wx.qlogo.cn/mmopen/r4R8QQwwHt9sxiczD1HHN3jZxAylNEztu2FR8H23ic2ZaibdDTPadpgQDjibiaqtwiaJYNTQqmm4kQd8s9y1kASskoPJMj5iaaEcDyP/0");
//		session.setAttribute("customerTable", customerTable);

		return new SuccessFailView(customerTable);
		
	}

	@RequestMapping(value = "getSignature")
	public View getSignature(HttpServletRequest request) {

		String url = request.getParameter("url");
		String signature = "";
		System.out.println(url);
		try {

			HttpSession session = request.getSession();
			String token = (String) session.getAttribute("token");
			// System.out.println("token:"+token);
			// if(token==null){
			String tokenstring = this.wechartService.gettoken();
			System.out.println("tokenstring========================"
					+ tokenstring);
			JSONObject object = new JSONObject(tokenstring);
			token = object.getString("access_token");
			session.setAttribute("token", token);
			// }
			String ticketString = this.wechartService.getticket(token);
			System.out.println("ticketString:" + ticketString);
			JSONObject ticketobject = new JSONObject(ticketString);
			String ticket = ticketobject.getString("ticket");
			System.out.println("ticket:" + ticket);
			System.out.println("url:" + url);
			signature = this.wechartService.getsignature(ticket, url);
			System.out.println(signature.toLowerCase());
			AppUser user = (AppUser) session.getAttribute("user");
			String openid = "";
			if (user != null) {
				openid = user.getOpenid();
			}
			// String prepay_id =
			// this.orderService.prepay(openid,signature.toLowerCase());
			// System.out.println("prepay_id:"+prepay_id);
		} catch (Exception e) {
			return new SuccessFailView(signature.toLowerCase());
		}
		System.out.println("signature=========" + signature.toLowerCase());
		return new SuccessFailView(signature.toLowerCase());
	}

	@RequestMapping(value = "pay")
	public View pay(HttpServletRequest request) {
		String ip = request.getParameter("ip");
		String orderNo = request.getParameter("orderNo");
		String totalnum = request.getParameter("payRealWX");
		String newOrderNo = request.getParameter("newOrderNo");
		// System.out.println("ordernum="+ordernum);
		// ip = request.getRemoteAddr();
		// System.out.println(ip);
		HttpSession session = request.getSession();
		// AppUser user = (AppUser) session.getAttribute("user");
		CustomerTable table = (CustomerTable) session
				.getAttribute("customerTable");
		System.out.println("user=" + table);
		String openid = "";
		String prepayxml = "";
		if (table != null) {
			openid = table.getWechatId();
		}
		System.out.println("openid============" + openid);
		try {
			prepayxml = this.wechartService.prepay(openid, ip,orderNo,newOrderNo,
					totalnum);
			System.out.println("prepayxml=========="+prepayxml);
			return this.payLogWXService.paysignSave(table,request,prepayxml,newOrderNo);
			
		} catch (IOException e) {
			e.printStackTrace();
			return new SuccessFailView(false,"鏀粯鎻愪氦澶辫触銆�);
		}
	}

	@RequestMapping(value = "paysign")
	public View paysign(HttpServletRequest request) {
		String prepay_id = request.getParameter("prepay_id");
		System.out.println("prepay_id==========" + prepay_id);
		String prepayxml = "";
		// String ip = request.getRemoteAddr();
		try {
			prepayxml = this.wechartService.getsignaturepay(prepay_id);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("prepayxml========" + prepayxml);
		return new SuccessFailView(prepayxml);
	}

	@RequestMapping(value = "paylast")
	public void paylast(HttpServletRequest request) {
		System.out.println("鏀粯");
		// return new SuccessFailView(true);
		// return "info";
	}

	@RequestMapping(value = "listProducttype")
	public View listProducttype() {
		ProductType type = this.productTypeService.findForIndex();
		return new SuccessFailView(type);
	}

	// xf
	@RequestMapping(value = "getProducttypeList")
	public View getProducttypeList() {
		List<ProductType> list = this.productTypeService.list();
		return new SuccessFailView(list);
	}

	// xf
	@RequestMapping(value = "get1ProductByType")
	public View get1ProductByType(HttpServletRequest request) {
		String productType = request.getParameter("productType");
		ProductTable product = this.productService
				.get1ProductByType(productType);
		return new SuccessFailView(product);
	}

	@RequestMapping(value = "listProduct")
	public View listProduct(HttpServletRequest request, Integer page,
			Integer rows, String sidx, String sord) {
		String product_status = request.getParameter("product_status");
		List<ProductView> list = this.productViewService
				.listForIndex(product_status);
		return new SuccessFailView(list);
	}

	@RequestMapping(value = "searchproduct")
	public View searchproduct(HttpServletRequest request) {
		String product_id = request.getParameter("product_id");
		ProductView view = this.productViewService.findById(Integer
				.valueOf(product_id));
		return new SuccessFailView(view);
	}


	
	@RequestMapping(value = "booleancustomerList")
	public View booleancustomerList(HttpServletRequest req) {
		String wechatId = req.getParameter("wechatId");
		CustomerTable customerTable = this.customerTableService.findByWechatId(wechatId);
		if(customerTable == null){
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
	}
	@RequestMapping(value = "booleancustomerListsale")
	public View booleancustomerListsale(HttpServletRequest req) {
		String wechatId = req.getParameter("wechatId");
		CustomerTable customerTable = this.customerTableService.findByWechatId(wechatId);
		//濡傛灉鍘熸潵鏄細鍛樹篃鍙互缁х画娉ㄥ唽
		if(customerTable == null||customerTable.getCustomerType().getCustomerTypeId()==4){
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
	}
	@RequestMapping(value = "saveCustomer")
	public View saveCustomer(HttpServletRequest req) {
		try {
			String wechatId = req.getParameter("wechatId");
			// 涓嶅啀闇�浜嗭紝鍚庡彴澧炲姞鐨勬椂鍊欑洿鎺�
			// String parentId = req.getParameter("parentId");
			String postcode = req.getParameter("postcode");
			String mobilephone = req.getParameter("mobilephone");
			String wechatName = req.getParameter("wechatName");
			String headImgUrl = req.getParameter("headImgUrl");
			System.out.println(postcode+"======="+mobilephone+"=========="+wechatId);
			CustomerTable customerWx = this.customerTableService
					.findByWechatId(wechatId);
			System.out.println(customerWx);
			if (customerWx != null
					&& customerWx.getCustomerType().getCustomerTypeId() != 4) {
				//return new SuccessFailView(false, "鎮ㄥ凡缁忔敞鍐�涓嶈兘鍐嶆娉ㄥ唽銆�);
				return new SuccessFailView(false, "鎮ㄧ殑娉ㄥ唽淇℃伅鏈夎锛屽簲涓庡悗鍙颁俊鎭竴鑷达紝璇锋牳瀵�);
			}
			CustomerTable customerPhone = this.customerTableService.valid(
					postcode, mobilephone);
			if (customerPhone != null) {
				//澶勭悊鐩稿悓寰俊鍙蜂笉鍚屾墜鏈哄彿鐨勯棶棰�
				if(customerWx != null&&customerWx.getCustomerId()!=customerPhone.getCustomerId())
				{
					//return new SuccessFailView(false, "娉ㄥ唽澶辫触锛屾寰俊鍙峰凡缁忎娇鐢ㄥ叾浠栨墜鏈哄彿娉ㄥ唽杩囪处鍙枫�"+customerWx.getMobilephone()+"銆戙�");	
					return new SuccessFailView(false, "鎮ㄧ殑娉ㄥ唽淇℃伅鏈夎锛屽簲涓庡悗鍙颁俊鎭竴鑷达紝璇锋牳瀵�);
				}
				// 涓嶇鎵惧埌鐨勭敤鎴锋槸浠�箞绫诲瀷锛屽彧缁戝畾寰俊鍙凤紝涓嶅仛涓婄骇缁戝畾鍜岀被鍨嬮噸缃�
				if(customerWx!= null){
					customerWx.setAddress(customerPhone.getAddress());
					customerWx.setAgentType(customerPhone.getAgentType());
					customerWx.setAmount(customerPhone.getAmount());
					customerWx.setBankName(customerPhone.getBankName());
					customerWx.setBankNo(customerPhone.getBankNo());
					customerWx.setBirthday(customerPhone.getBirthday());
					customerWx.setBusinessLicenceImg(customerPhone.getBusinessLicenceImg());
					customerWx.setBusinessLicenceNo(customerPhone.getBusinessLicenceNo());
					customerWx.setCaseTable(customerPhone.getCaseTable());
					customerWx.setCity(customerPhone.getCity());
					customerWx.setContractNo(customerPhone.getContractNo());
					customerWx.setCustomerArea(customerPhone.getCustomerArea());
					customerWx.setCustomerCode(customerPhone.getCustomerCode());
					customerWx.setCustomerIndu(customerPhone.getCustomerIndu());
					customerWx.setCustomerLegal(customerPhone.getCustomerLegal());
					customerWx.setCustomerLevel(customerPhone.getCustomerLevel());
					customerWx.setCustomerName(customerPhone.getCustomerName());
					customerWx.setCustomerStatus(customerPhone.getCustomerStatus());
					customerWx.setCustomerType(customerPhone.getCustomerType());
					customerWx.setDatetime(new Date());
					customerWx.setDeptTable(customerPhone.getDeptTable());
					customerWx.setEmail(customerPhone.getEmail());
					customerWx.setHeadimgurl(headImgUrl);
					customerWx.setIdCard(customerPhone.getIdCard());
					customerWx.setIdCardImg(customerPhone.getIdCardImg());
					customerWx.setLinkman(customerPhone.getLinkman());
					customerWx.setMobilephone(customerPhone.getMobilephone());
					customerWx.setNumeTable(customerPhone.getNumeTable());
					customerWx.setParentId(customerPhone.getParentId());
					customerWx.setPostcode(customerPhone.getPostcode());
					customerWx.setQqNo(customerPhone.getQqNo());
					customerWx.setSex(customerPhone.getSex());
					customerWx.setVipShare(customerPhone.getVipShare());
					customerWx.setWechatId(wechatId);
					customerWx.setWechatName(wechatName);
					this.customerTableService.save(customerWx);
					this.customerTableService.delete(customerPhone);
				}else{
					customerWx = new CustomerTable();
					customerWx.setAddress(customerPhone.getAddress());
					customerWx.setAgentType(customerPhone.getAgentType());
					customerWx.setAmount(customerPhone.getAmount());
					customerWx.setBankName(customerPhone.getBankName());
					customerWx.setBankNo(customerPhone.getBankNo());
					customerWx.setBirthday(customerPhone.getBirthday());
					customerWx.setBusinessLicenceImg(customerPhone.getBusinessLicenceImg());
					customerWx.setBusinessLicenceNo(customerPhone.getBusinessLicenceNo());
					customerWx.setCaseTable(customerPhone.getCaseTable());
					customerWx.setCity(customerPhone.getCity());
					customerWx.setContractNo(customerPhone.getContractNo());
					customerWx.setCustomerArea(customerPhone.getCustomerArea());
					customerWx.setCustomerCode(customerPhone.getCustomerCode());
					customerWx.setCustomerIndu(customerPhone.getCustomerIndu());
					customerWx.setCustomerLegal(customerPhone.getCustomerLegal());
					customerWx.setCustomerLevel(customerPhone.getCustomerLevel());
					customerWx.setCustomerName(customerPhone.getCustomerName());
					customerWx.setCustomerStatus(customerPhone.getCustomerStatus());
					customerWx.setCustomerType(customerPhone.getCustomerType());
					customerWx.setDatetime(new Date());
					customerWx.setDeptTable(customerPhone.getDeptTable());
					customerWx.setEmail(customerPhone.getEmail());
					customerWx.setHeadimgurl(headImgUrl);
					customerWx.setIdCard(customerPhone.getIdCard());
					customerWx.setIdCardImg(customerPhone.getIdCardImg());
					customerWx.setLinkman(customerPhone.getLinkman());
					customerWx.setMobilephone(customerPhone.getMobilephone());
					customerWx.setNumeTable(customerPhone.getNumeTable());
					customerWx.setParentId(customerPhone.getParentId());
					customerWx.setPostcode(customerPhone.getPostcode());
					customerWx.setQqNo(customerPhone.getQqNo());
					customerWx.setSex(customerPhone.getSex());
					customerWx.setVipShare(customerPhone.getVipShare());
					customerWx.setWechatId(wechatId);
					customerWx.setWechatName(wechatName);
					this.customerTableService.save(customerWx);
				}
				return new SuccessFailView(true, "娉ㄥ唽鎴愬姛銆�);

			} else {
				//return new SuccessFailView(false, "娉ㄥ唽澶辫触锛岃鍏堢淮鎶ゅ悗鍙颁俊鎭�");
				return new SuccessFailView(false,"鎮ㄧ殑娉ㄥ唽淇℃伅鏈夎锛屽簲涓庡悗鍙颁俊鎭竴鑷达紝璇锋牳瀵�);
			}
		} catch (Exception e) {
			System.out.println(e);
			return new SuccessFailView(false, "娉ㄥ唽澶辫触銆�);
		}
	}
	
	@RequestMapping(value = "saveCustomerSale")
	public View saveCustomerSale(HttpServletRequest req) {
		try {
			String customerName = req.getParameter("customerName");
			String wechatId = req.getParameter("wechatId");
			String wechatName = req.getParameter("wechatName");
			String headImgUrl = req.getParameter("headImgUrl");
			String parentId = req.getParameter("parentId");
			String customerId = req.getParameter("customerId");
			String mobilephone = req.getParameter("mobilephone");
			String customerArea = req.getParameter("customerArea");
			String customerLegal = req.getParameter("customerLegal");
			String businessLicenceNo = req.getParameter("businessLicenceNo");
			String email = req.getParameter("email");
			String bankName = req.getParameter("bankName");
			String bankNo = req.getParameter("bankNo");
			CustomerTable customer = new CustomerTable();
			CustomerTable customerWx = this.customerTableService.findByWechatId(wechatId);
			
			if (customerWx != null
					&& customerWx.getCustomerType().getCustomerTypeId() != 4) {
				//褰撳墠鐢ㄦ埛宸插瓨鍦�涓斾笉鏄細鍛�
				return new SuccessFailView(false, "鎮ㄥ凡缁忔敞鍐�涓嶈兘鍐嶆娉ㄥ唽銆�);//***
			}else if (customerWx != null
					&& customerWx.getCustomerType().getCustomerTypeId() == 4) 
			{
				//褰撳墠鐢ㄦ埛宸插瓨鍦�涓旀槸浼氬憳
				customer=customerWx;
			} else if(customerWx==null)
			{
				//褰撳墠鐢ㄦ埛涓嶅瓨鍦�
				if (customerId != null && !"".equals(customerId)) {
					//customerId 瀛樺湪
					customer.setCustomerId(Integer.valueOf(customerId));
				}
			}
			CustomerTable customerPhone = this.customerTableService.findByPhone( mobilephone);
			if (customerPhone != null && customerPhone.getCustomerId() != null) {
				// 鐢ㄦ墜鏈哄彿鎵惧埌鐨勪細鍛樺瓨鍦�
				if (customer.getCustomerId() != null
						&& customer.getCustomerId() != customerPhone
								.getCustomerId()) {
					// 濡傛灉褰撳墠鐢ㄦ埛宸茬粡鏄細鍛橈紝涓斿拰鐢ㄦ敞鍐屾墜鏈哄彿鎵惧埌鐨�浼氬憳 ID涓嶅悓
					return new SuccessFailView(false, "娉ㄥ唽澶辫触锛屾鎵嬫満鍙峰凡缁忚娉ㄥ唽銆�);
				} else if (customerPhone != null&& customer.getCustomerId() != customerPhone
						.getCustomerId()) {
					// 褰撳墠鐢ㄦ埛鏄細鍛橈紝浣嗘槸鍜岀敤娉ㄥ唽鎵嬫満鍙锋壘鍒扮殑浼氬憳 ID鐩稿悓
					if (customerPhone.getCustomerType().getCustomerTypeId() == 4) {
						//鐢ㄦ敞鍐屾墜鏈哄彿鎵惧埌鐨勪細鍛�鏄櫘閫氫細鍛�
						customer = customerPhone;//閲嶆柊缁戝畾鎵嬫満鎵惧埌鐨勪細鍛�
					}else
					{
						//鐢ㄦ敞鍐屾墜鏈哄彿鎵惧埌鐨勪細鍛樹笉鏄櫘閫氫細鍛�
						return new SuccessFailView(false, "鎮ㄥ凡缁忔敞鍐�涓嶈兘鍐嶆娉ㄥ唽銆�);//姝ょ鎯呭喌鍚�**澶�搴旇鍦�**澶勫凡澶勭悊锛屼笉浼氳蛋鍒拌繖涓�
					}
				}else if(customer.getCustomerId() == null)
				{
					//褰撳墠鐢ㄦ埛涓嶆槸浼氬憳
					customer = customerPhone;//閲嶆柊缁戝畾鎵嬫満鎵惧埌鐨勪細鍛�
				}
			}
			if (parentId != null && !"".equals(parentId)) {
				customer.setParentId(Integer.valueOf(parentId));
			}
			customer.setCustomerLevel(this.customerLevelService.get(15));
			customer.setCustomerName(customerName);
			customer.setWechatId(wechatId);
			customer.setMobilephone(mobilephone);
			customer.setCustomerArea(customerArea);
			customer.setCustomerLegal(customerLegal);
			customer.setWechatName(wechatName);
			customer.setHeadimgurl(headImgUrl);
			customer.setBusinessLicenceNo(businessLicenceNo);
			customer.setEmail(email);
			customer.setBankName(bankName);
			customer.setBankNo(bankNo);
			customer.setDatetime(new Date());
			CustomerTable customerTable  =this.customerTableService.get(Integer.valueOf(parentId));
			String s = this.codingRuleService.sale();
			customer.setCustomerCode(customerTable.getCustomerCode() + s);// 缁忛攢鍟嗙爜
			CodingRule rule = new CodingRule();
			rule.setSaleId(s);
			this.codingRuleService.save(rule);
			CustomerType type = this.customerTypeService.findById(2);
			customer.setCustomerType(type); // 瑙掕壊
			this.customerTableService.save(customer);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return new SuccessFailView(false,"娣诲姞澶辫触");
		}
		return new SuccessFailView(true,"娣诲姞鎴愬姛");
	}
	
	////涓嶅啀闇�浜嗭紝saveCustomer缁熶竴澶勭悊
	@RequestMapping(value = "bindAgent")
	public View bindAgent(HttpServletRequest req){
		String wechatId = req.getParameter("wechatId");
		String parentId = req.getParameter("parentId");
		String postcode = req.getParameter("postcode");
		String mobilephone = req.getParameter("mobilephone");
		CustomerTable customer=this.customerTableService.valid(postcode,mobilephone);
		try {
			if(customer != null&&customer.getWechatId()!=null&&!customer.getWechatId().equals("")){
				customer.setCustomerId(customer.getCustomerId());
				if (parentId != null && !"".equals(parentId)) {
					customer.setParentId(Integer.valueOf(parentId));
				}
				customer.setWechatId(wechatId);
				this.customerTableService.save(customer);
			}else{
				return new SuccessFailView(false);
			}
		} catch (Exception e) {
			System.out.println(e);
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
		
	}

	@RequestMapping(value = "togeren")
	public View geren(HttpServletRequest req) {
		String wechatId = req.getParameter("wechatId");
		GerenView view = this.gerenViewService.findById(wechatId);
		return new SuccessFailView(view);
	}

	

	@RequestMapping(value = "ss")
	public View ss(HttpServletRequest req) {
		String wechatId = req.getParameter("wechatId");
		GerenView view = this.gerenViewService.findById(wechatId);
		return new SuccessFailView(view);
	}

	@RequestMapping(value = "saveCustomerManager")
	public View saveCustomerManager(HttpServletRequest req) {
		try {
			String customerName = req.getParameter("customerName");
			String wechatId = req.getParameter("wechatId");
			String parentId = req.getParameter("parentId");
			String customerId = req.getParameter("customerId");
			String wechatName = req.getParameter("wechatName");
			String headImgUrl = req.getParameter("headImgUrl");
			String mobilephone = req.getParameter("mobilephone");
			String customerArea = req.getParameter("customerArea");
			String customerLegal = req.getParameter("customerLegal");
			String businessLicenceNo = req.getParameter("businessLicenceNo");
			String email = req.getParameter("email");
			String bankName = req.getParameter("bankName");
			String bankNo = req.getParameter("bankNo");
			CustomerTable customer = new CustomerTable();
			if (customerId != null && !"".equals(customerId)) {
				customer.setCustomerId(Integer.valueOf(customerId));
			}
			if (parentId != null && !"".equals(parentId)) {
				customer.setParentId(Integer.valueOf(parentId));
			}
			customer.setCustomerName(customerName);
			customer.setWechatId(wechatId);
			customer.setMobilephone(mobilephone);
			customer.setCustomerArea(customerArea);
			customer.setCustomerLegal(customerLegal);
			customer.setBusinessLicenceNo(businessLicenceNo);
			customer.setEmail(email);
			customer.setBankName(bankName);
			customer.setBankNo(bankNo);
			customer.setWechatName(wechatName);
			customer.setHeadimgurl(headImgUrl);
			String s = this.codingRuleService.manager();
			customer.setCustomerCode(s);
			CodingRule rule = new CodingRule();
			rule.setSaleId(s);
			this.codingRuleService.save(rule);
			//customer.setCustomerCode(UUID.randomUUID().toString()); // 缁忛攢鍟嗙爜
			CustomerType type = this.customerTypeService.findById(3);
			customer.setCustomerType(type); // 瑙掕壊
			this.customerTableService.save(customer);
		} catch (Exception e) {
			System.out.println(e);
			return new SuccessFailView("娣诲姞澶辫触");
		}
		return new SuccessFailView("娣诲姞鎴愬姛");
	}

	@RequestMapping(value = "myCard")
	public View myCard(HttpServletRequest req) {
		String cardId = req.getParameter("cardId");
		CardTable card = this.cardTableService.get(Integer.valueOf(cardId));
		return new SuccessFailView(card);
	}

	@RequestMapping(value = "cardPay")
	public View cardPay(HttpServletRequest req) {
		String totol = req.getParameter("totol");
		String cardId = req.getParameter("cardId");
		String orderNo = req.getParameter("orderNo");
		try {
			CardTable card = this.cardTableService.get(Integer.valueOf(cardId));
			card.setCardId(card.getCardId());
			card.setCardAmount(card.getCardAmount() - Float.parseFloat(totol));
			this.cardTableService.save(card);
			
			//鍗℃秷璐规槑缁�
			CardDetail detail = new CardDetail();
			detail.setTotal(Float.parseFloat(totol));
			OrderHead orderHead = this.orderHeadService.findByorderNo(orderNo);
			CardTable cardTable = this.cardTableService.get(Integer.valueOf(cardId));
			detail.setCardTable(cardTable);
			detail.setOrderHead(orderHead);
			this.cardDetailService.save(detail);
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView(false);
		}

		return new SuccessFailView(true);

	}

	@RequestMapping(value = "getTwoCode")
	public View twoCode(HttpServletRequest req) {
		HttpSession session = req.getSession();
		CustomerTable customerTable1 = (CustomerTable) session
				.getAttribute("customerTable");
		CustomerTable customerTable = this.customerTableService
				.findByWechatId(customerTable1.getWechatId());
		// CustomerTable customerTable =
		// this.customerTableService.findByWechatId(customerTable1.getWechatId());
		String text = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ Constants.WXAPPID+ "&redirect_uri="+ Constants.WXREDIRECT_URI+ "?username="+ customerTable.getCustomerId()+ "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect          ";
		int width = 300;
		int height = 300;
		String format = "png";
		String logoRealPathDir = req.getSession().getServletContext()
				.getRealPath("/wechart/img");
		MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
		Map hints = new HashMap();
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix;
		try {
			bitMatrix = multiFormatWriter.encode(text, BarcodeFormat.QR_CODE,
					width, height, hints);
			if (customerTable != null) {
				String logoimg = customerTable1.getHeadimgurl();
				System.out.println("logoimg=======" + logoimg);
				System.out.println("logoRealPathDir=======" + logoRealPathDir);
				File outputFile = new File(logoRealPathDir + "/",
						customerTable.getWechatId() + ".png");
				MatrixToImageWriter.writeToFile(logoRealPathDir, bitMatrix,
                        format, outputFile, logoimg,
                        customerTable.getWechatId());
			} else {
				System.out.println("1");
				// return new SuccessFailView("img/new.png");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new SuccessFailView("img/" + customerTable.getWechatId()
				+ ".png");
	}

	
	
	@RequestMapping(value = "checkPay")
	public View checkPay(HttpServletRequest req){
		String orderNo = req.getParameter("orderNo");
		List<OrderBody> bodyList = this.orderBodyService.findByOrderNo(orderNo);
		return new SuccessFailView(bodyList);
	}
	
	//涓嶇敤浜嗭紝鎵�湁浜у搧閮藉彲浠ョ敤鍗★紝濡傛灉浠ュ悗鐢ㄧ洿鎺ュ湪 鐣岄潰璁＄畻
	@RequestMapping(value = "checkMoney")
	public View checkMoney(HttpServletRequest req){
			String orderNo = req.getParameter("orderNo");
			//鏍规嵁浜у搧鏄惁鍙互寮�敮浠樿绠楀嚭涓嶅彲浠ョ敤鍗℃敮浠樼殑閲戦
			List<OrderBody> bodyList = this.orderBodyService.findBrand(orderNo, "1");
			float aa = 0f;
			for (int i = 0; i < bodyList.size(); i++) {
				OrderBody body = bodyList.get(i);
				if("1".equals(body.getProductTable().getBrand())){
					aa+=body.getProductTable().getStandardPrice() * body.getProductNum();
				}
			}
			return new SuccessFailView(String.valueOf(aa));
	}
	//涓嶇敤浜嗭紝鎵�湁浜у搧閮藉彲浠ョ敤鍗★紝濡傛灉浠ュ悗鐢ㄧ洿鎺ュ湪 鐣岄潰璁＄畻
	@RequestMapping(value = "checkCardMoney")
	public View checkCardMoney(HttpServletRequest req){
		String orderNo = req.getParameter("orderNo");
		//鏍规嵁浜у搧鏄惁鍙互寮�敮浠樿绠楀嚭涓嶅彲浠ョ敤鍗℃敮浠樼殑閲戦
		List<OrderBody> bodyList = this.orderBodyService.findBrand(orderNo, "0");
		float aa = 0f;
		for (int i = 0; i < bodyList.size(); i++) {
			OrderBody body = bodyList.get(i);
			if("0".equals(body.getProductTable().getBrand())){
				aa+=body.getProductTable().getProductPrice()* body.getProductNum();
			}
		}
		return new SuccessFailView(String.valueOf(aa));
	}
	
//	@RequestMapping(value = "checkCoupon")
//	public View checkCoupon(HttpServletRequest req){
//		String orderNo = req.getParameter("orderNo");
//		OrderHead orderHead = null;
//		if (orderNo != null && !"".equals(orderNo)) {
//			orderHead = this.orderHeadService.findByorderNo(orderNo);
//		}
//		float couponTotal = 0;
//		float couponTotal1 = 0;
//		List<OrderBody> orderBodies = this.orderBodyService
//				.findByOrderNo(orderNo);
//		HttpSession session = req.getSession();
//		CustomerTable customer = (CustomerTable) session
//				.getAttribute("customerTable");
//		if (customer != null) {
//			CustomerTable customerTable = this.customerTableService
//					.findByWechatId(customer.getWechatId());
//			if (customerTable != null) {
//				int num = 0;
//				for (OrderBody orderBody : orderBodies) {
//					num = num + orderBody.getProductNum();
//				}
//					List<CouponTable> couponTableList = customerTable
//							.getCouponTableList();
//					for (CouponTable couponTable : couponTableList) {
//						if (couponTable.getProductTable() == null) {
//							if(orderHead.getOrderTotal()>=couponTable.getAmt()&&num>=couponTable.getQut()){
//								couponTotal = couponTotal
//										+ couponTable.getCouponValue();
//							}
//						} else {
//							for (OrderBody orderBody : orderBodies) {
//							if (couponTable.getProductTable().getProductId() == orderBody
//									.getProductTable().getProductId()) {
//								if(orderHead.getOrderTotal()>=couponTable.getAmt()&&orderBody.getProductNum()>=couponTable.getQut()){
//									if("1".equals(couponTable.getProductTable().getBrand())){
//										couponTotal1 = couponTotal1
//												+ couponTable.getCouponValue();
//									}else{
//										couponTotal = couponTotal
//												+ couponTable.getCouponValue();
//									}
//									
//								}
//							}
//						}
//					}
//				}
//			}
//		}
//		System.out.println("====couponTotal===="+couponTotal);
//		System.out.println("====couponTotal1===="+couponTotal1);
//		return new SuccessFailView(String.valueOf(couponTotal));
//	}
	
	
	@RequestMapping(value = "orderHeadList")
	public View orderHeadList(HttpServletRequest req){
		String status = req.getParameter("status");
		//String orderNo = req.getParameter("orderNo");
		HttpSession session = req.getSession();
		CustomerTable customerTable = (CustomerTable) session
				.getAttribute("customerTable");
		// CustomerTable customerTable =
		// this.customerTableService.findByWechatId("oR38vwZ860mtiYu4uupI0ib5E4mw");
		CustomerTable customerTable = this.customerTableService
				.findByWechatId(customerTable1.getWechatId());
		if (customerTable == null) {
			System.out.println("========session==========");
			customerTable = (CustomerTable) session
					.getAttribute("customerTable");
		}
		List<OrderHead> list = this.orderHeadService.findByOrder(status,customerTable.getWechatId());
		return new SuccessFailView(list);
	}
	

	
	@RequestMapping(value = "fahuodHeadList")
	public View fahuodHeadList(HttpServletRequest req){
		String status = req.getParameter("status");
		//String orderNo = req.getParameter("orderNo");
		HttpSession session = req.getSession();
		CustomerTable customerTable = (CustomerTable) session
				.getAttribute("customerTable");
		// CustomerTable customerTable =
		// this.customerTableService.findByWechatId("oR38vwZ860mtiYu4uupI0ib5E4mw");
		CustomerTable customerTable = this.customerTableService
				.findByWechatId(customerTable1.getWechatId());
		if (customerTable == null) {
			System.out.println("========session==========");
			customerTable = (CustomerTable) session
					.getAttribute("customerTable");
		}
		List<OrderHead> list = this.orderHeadService.findByFahuoOrder(status,customerTable.getWechatId());
		return new SuccessFailView(list);
	}
	
	@RequestMapping(value = "orderBodyList")
	public View orderBodyList(HttpServletRequest req){
		String orderHeadId = req.getParameter("orderHeadId");
		List<OrderBody> list = this.orderBodyService.findByOrder(Integer.valueOf(orderHeadId));
		return new SuccessFailView(list);
	}
	
	
	@RequestMapping(value = "setStatus")
	public View setStatus(HttpServletRequest req){
		String orderNo = req.getParameter("orderNo");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
		HttpSession session = req.getSession();
		CustomerTable customerTable = (CustomerTable) session
				.getAttribute("customerTable");
		CustomerTable customerTable = this.customerTableService
				.findByWechatId(customerTable1.getWechatId());
		if (customerTable == null) {
			System.out.println("========session==========");
			customerTable = (CustomerTable) session
					.getAttribute("customerTable");
		}
		try {
			OrderHead orderHead = this.orderHeadService.findByorderNo(orderNo);
			orderHead.setOrderStatus("2");
			orderHead.setCourierName(name);
			orderHead.setCourierPhone(phone);
			this.orderHeadService.save(orderHead);
			String message="灏婃暚鐨勮吹瀹炬偍濂斤細鎮ㄧ殑璁㈠崟姝ｅ湪娲鹃�涓紝蹇�鍛樺鍚嶏細"+name+",蹇�鍛樼數璇�"+phone+",璇蜂繚鎸佹墜鏈虹晠閫氾紒澹规竻寰晢鍩庣鎮ㄥ仴搴峰揩涔愶紒^_^^_^^_^^_^";
			this.wechartService.sendShouHuoWXMessage(orderHead.getCustomerTable().getWechatId(), message);
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
		
	}
	
	
	@RequestMapping(value = "setStatus1")
	public View setStatus1(HttpServletRequest req){
		String orderNo = req.getParameter("orderNo");
		HttpSession session = req.getSession();
		CustomerTable customerTable = (CustomerTable) session
				.getAttribute("customerTable");
		CustomerTable customerTable = this.customerTableService
				.findByWechatId(customerTable1.getWechatId());
		if (customerTable == null) {
			System.out.println("========session==========");
			customerTable = (CustomerTable) session
					.getAttribute("customerTable");
		}
		try {
			OrderHead orderHead = this.orderHeadService.findByorderNo(orderNo);
			orderHead.setOrderStatus("3");
			this.orderHeadService.save(orderHead);
			String message="涓讳汉涓讳汉锛屼綘鐨勮鎷兼垬鏋滃凡缁忔姷杈撅紝涓嶈蹇樿缁欎竴涓ぇ澶х殑濂借瘎~";
			this.wechartService.sendShouHuoWXMessage(customerTable.getWechatId(), message);
		} catch (Exception e) {
			e.printStackTrace();
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
		
		
	}
	
	@RequestMapping(value = "saveinfo")
	public View saveinfo(HttpServletRequest req){
		String wechatId = req.getParameter("wechatId");
		String customerName = req.getParameter("customerName");
		String wechatName = req.getParameter("wechatName");
		String sex = req.getParameter("sex");
		String birthday = req.getParameter("birthday");
		String email = req.getParameter("email");
		CustomerTable customerTable = this.customerTableService.findByWechatId(wechatId);
		if(customerTable != null){
			try {
				customerTable.setCustomerId(customerTable.getCustomerId());
				customerTable.setCustomerName(customerName);
				customerTable.setWechatName(wechatName);
				customerTable.setSex(sex);
				customerTable.setBirthday(birthday);
				customerTable.setEmail(email);
				this.customerTableService.save(customerTable);
			} catch (Exception e) {
				e.printStackTrace();
				return new SuccessFailView(false);
			}
			
		}
		return new SuccessFailView(true);									
	}
	
	@RequestMapping(value = "commentsSave")
	public View commentsSave(HttpServletRequest req){
		String productId = req.getParameter("productId");
		String commentContent = req.getParameter("commentContent");
		String starNum = req.getParameter("StarNum");
		String wechatId = req.getParameter("wechatId");
		String orderBodyId = req.getParameter("orderBodyId");
		CustomerTable customer = this.customerTableService.findByWechatId(wechatId);
		ProductTable product = this.productService.get(Integer.valueOf(productId));
		Comments comments = new Comments();
		comments.setCommentsScore(Integer.valueOf(starNum));
		if (!"".equals(commentContent) && commentContent != null) {
			try {
				commentContent = new String(commentContent.getBytes("ISO-8859-1"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		comments.setCommentContent(commentContent);
		comments.setCustomerTable(customer);
		comments.setProductTable(product);
		comments.setDatetime(new Date());
		this.commentsService.save(comments);
		OrderBody body = this.orderBodyService.get(Integer.valueOf(orderBodyId));
		// boolean flag=false;
		body.setComments(comments);
		this.orderBodyService.save(body);
//		  List<OrderBody> lt =this.orderBodyService.find(String.valueOf(body.getOrderHead().getOrderHeadId()), new Object[0]);
//		  if(lt!=null && lt.size()>0){
//			  for(int i=0;i<lt.size();i++){
//				  OrderBody ob= lt.get(i);
//				  if(ob.getComments()==null ||  ob.getComments().getCommentsId()==0 ){
//					  flag=true;
//					  break;
//				  } 
//			  }
//		  }
		  
//		  if(!flag){//璁㈠崟涓昏〃涓嬫墍鏈変骇鍝侀兘璇勪环瀹屾瘯 涓昏〃鐘舵�鍒舵垚5 浠ｈ〃浠ヨ瘎浠�
//			  OrderHead head = this.orderHeadService.get(body.getOrderHead().getOrderHeadId());
//			  head.setOrderStatus("5");
//			  this.orderHeadService.save(head);
//				 
//		  }
		  
		return new SuccessFailView(true);			
	}
	
	@RequestMapping(value = "checkCard")
	public View checkCard(HttpServletRequest req){
		String cardId = req.getParameter("str");
		CardTable cardTable = this.cardTableService.get(Integer.valueOf(cardId));
		if("3".equals(cardTable.getCardStatus())){
			return new SuccessFailView(false);
		}
		return new SuccessFailView(true);
	}
	

	@RequestMapping(value = "checkCardJiHuo")
	public View checkCardJiHuo(HttpServletRequest req){
		String cardId = req.getParameter("str");
		String[] ids = cardId.split(",");
		for (int i = 0; i < ids.length; i++) {
			CardTable cardTable = this.cardTableService.get(Integer.valueOf(ids[i]));
			if("3".equals(cardTable.getCardStatus())){
				return new SuccessFailView(false);
			}else{
				return new SuccessFailView(true);
			}
			
		}
		return new SuccessFailView(true);
	}
	
	
	@RequestMapping(value = "conpany")
	public View conpany(HttpServletRequest req){
		String openid = req.getParameter("openid");
		try {
			CustomerTable customerTable = this.customerTableService.findConpany();
			customerTable.setCustomerId(customerTable.getCustomerId());
			customerTable.setWechatId(openid);
			this.customerTableService.save(customerTable);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			return new SuccessFailView(false);
		}
		
		return new SuccessFailView(true);
	}
	*/
	
}
