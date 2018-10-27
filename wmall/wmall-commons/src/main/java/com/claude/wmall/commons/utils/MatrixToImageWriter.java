package com.claude.wmall.commons.utils;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.imageio.ImageIO;


import com.google.zxing.common.BitMatrix;

public final class MatrixToImageWriter {
	private static final int BLACK = 0xFF000000;
	private static final int WHITE = 0xFFFFFFFF;
	private MatrixToImageWriter(){}
	public static BufferedImage toBufferedImage(BitMatrix martix){
		int width = martix.getWidth();
		int height = martix.getHeight();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		for(int x =0 ;x<width;x++){
			for(int y=0;y<height;y++){
				image.setRGB(x, y, martix.get(x, y)?BLACK:WHITE);
			}
		}
		return image;
	}
	public static void writeToFile(String logoRealPathDir,BitMatrix matrix,String format,File file,String logoimg,String openid) throws Exception{
		BufferedImage image = toBufferedImage(matrix);
		
		URL url = new URL(logoimg);
		System.out.println("logoimg============================"+logoimg);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(5 * 1000);
		InputStream inStream = conn.getInputStream(); 
		byte[] data = readInputStream(inStream);
		File imageFile = new File(logoRealPathDir+"/",openid+".jpg");
		FileOutputStream outStream = new FileOutputStream(imageFile);
		outStream.write(data);
		outStream.close();
		
		Image img = ImageIO.read(new File(logoRealPathDir+"/",openid+".jpg"));
		int x = (image.getWidth() - 40) / 2; 
        int y = (image.getHeight() - 40) / 2;
        //int width = img.getWidth(null);        // 源图宽   
        //int height = img.getHeight(null);        // 源图高
        //float scale = 5.5f;
        //Image imga = img.getScaledInstance((int)(width * scale), (int)(height * scale), Image.SCALE_DEFAULT);
        //BufferedImage tag = new BufferedImage((int)(width * scale), (int)(height * scale), BufferedImage.TYPE_INT_RGB);
        //Graphics2D g = tag.createGraphics();
        //g.drawImage(img, 0, 0, null); // 绘制缩小后的图   
        //g.dispose();   
        //OutputStream out = new FileOutputStream(new File(logoRealPathDir+"/"+".gif"));   
        //ImageIO.write(tag, "GIF", out);// 输出 
        //out.close();   
        
        Graphics2D gs = image.createGraphics();
		gs.drawImage(img, x, y, 40,40,null);
		gs.dispose(); 
		//OutputStream out = new FileOutputStream(logoRealPathDir+"/"+sql.jxc.store.getOpenid()+".jpg");
        //ImageIO.write(tag, "GIF", out);// 输出 
        //out.close();
		img.flush(); 
		if(!ImageIO.write(image, format, file)){
			throw new IOException("Could not write an image of format "+format+" file");
		}
	}
	public static byte[] readInputStream(InputStream inStream) throws Exception{  
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while( (len=inStream.read(buffer)) != -1 ){
			outStream.write(buffer, 0, len);
		}
		inStream.close();
		return outStream.toByteArray();
	}
	public static void writeToStream(BitMatrix matrix,String format,OutputStream stream) throws IOException{
		BufferedImage image = toBufferedImage(matrix);
		if(!ImageIO.write(image, format, stream)){
			throw new IOException("Could not write an image of format "+format+" file");
		}
	}
}
