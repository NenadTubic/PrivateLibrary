package com.teletubici;

import java.time.Duration;

import static org.testng.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class NewBook {

	public static void main(String[] args) {
		WebDriver driver = new ChromeDriver();
		WebDriverWait wait;
		wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		driver.navigate().to("http://localhost:3000/books");
		
		WebElement loginBtn = driver.findElement(By.xpath("/html/body/div/div/header/div/button[2]"));
		wait.until(ExpectedConditions.elementToBeClickable(loginBtn)).click();
		WebElement userName = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/div[1]/div/input"));
		wait.until(ExpectedConditions.visibilityOf(userName)).sendKeys("test");
		WebElement passWord = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[1]/div[2]/div/input"));
		wait.until(ExpectedConditions.visibilityOf(passWord)).sendKeys("test");
		wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[2]/button[1]")))).click();
		
		WebElement navBtn = driver.findElement(By.xpath("/html/body/div/div/header/div/button[1]"));
		wait.until(ExpectedConditions.elementToBeClickable(navBtn)).click();
		
		WebElement booksBtn = driver.findElement(By.xpath("/html/body/div/div/div/div/ul[1]/li/a"));
		wait.until(ExpectedConditions.elementToBeClickable(booksBtn)).click();
		
		WebElement addNewBookBtn = driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div[1]/button"));
		wait.until(ExpectedConditions.elementToBeClickable(addNewBookBtn)).click();
		
		wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[1]/input")))).sendKeys("Na Drini Cuprija");
		wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[2]/input")))).sendKeys("1231231231");
		wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[3]/input")))).sendKeys("1995");
		wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[4]/input")))).sendKeys("5");
		Select bookGenre = new Select(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[5]/select")));
		bookGenre.selectByIndex(2);
		Select authorNames = new Select(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/div[6]/select")));
		authorNames.selectByIndex(2);
		wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div/div/main/div[2]/div/button")))).click();

		wait.until(ExpectedConditions.elementToBeClickable(booksBtn)).click();
		assertEquals(driver.findElement(By.xpath("//span[text()='Na Drini Cuprija']")).getText(), "Na Drini Cuprija");
		driver.quit();
	}
}