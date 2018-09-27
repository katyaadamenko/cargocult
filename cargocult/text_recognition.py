import time
from pathlib import Path
from contextlib import contextmanager

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select


@contextmanager
def make_driver(debug=False):
    profile = webdriver.FirefoxProfile()
    profile.set_preference("browser.download.folderList", 2)
    profile.set_preference("browser.download.manager.showWhenStarting", False)
    profile.set_preference("browser.download.dir", './')
    profile.set_preference("browser.helperApps.neverAsk.saveToDisk", "text/txt")
    profile.set_preference("browser.helperApps.neverAsk.saveToDisk","text/csv")

    options = webdriver.firefox.options.Options()
    if not debug:
        options.set_headless(headless=True)

    driver = webdriver.Firefox(firefox_options=options, firefox_profile=profile)

    driver.wait5 = WebDriverWait(driver, 5)
    driver.wait20 = WebDriverWait(driver, 20)
    driver.wait100 = WebDriverWait(driver, 100)

    try:
        yield driver
    finally:
        driver.quit()

def recognise(filepath, debug=False):
    link = 'https://finereaderonline.com/ru-ru/Tasks/Create'

    with make_driver(debug) as driver:
        driver.get(link)
 
        login_button = driver.wait5.until(EC.element_to_be_clickable(
                (By.CLASS_NAME, "modal-login-btn")))
        login_button.click()

        box_mail = driver.wait5.until(EC.presence_of_element_located(
                (By.ID, "email-Layout")))
        box_mail.send_keys('Lusine.Airapetyan@skoltech.ru')

        box_pswd = driver.wait5.until(EC.presence_of_element_located(
                (By.ID, "password-Layout")))
        box_pswd.send_keys('cargocult')

        next_button = driver.wait5.until(EC.element_to_be_clickable(
                (By.CLASS_NAME, "button-green")))
        next_button.click()
        
        text_button = driver.find_element_by_xpath("//img[@src='/Content/images/format-text@2x.png']")
        text_button.click()
        
        delete_lang_button = driver.find_element_by_xpath("//a[@class='button-delete clickable']")
        delete_lang_button.click()

        button = driver.wait5.until(EC.element_to_be_clickable(
                (By.ID, "pickfiles")))
        button.click()

        driver.find_element_by_css_selector('input[type="file"]').clear()
        driver.find_element_by_css_selector('input[type="file"]').send_keys(filepath)

        driver.wait20.until(EC.presence_of_element_located(
                (By.CLASS_NAME, "result-selected-text")))

        print('before sleep')
        time.sleep(10)
        print ("wait's over")

        cookie_button = driver.wait5.until(EC.element_to_be_clickable(
                (By.ID, "CybotCookiebotDialogBodyButtonAccept")))
        cookie_button.click()

        recognize_button = driver.wait5.until(EC.element_to_be_clickable(
                (By.ID, "recognize-btn-value")))
        recognize_button.click()

        download = driver.wait100.until(EC.element_to_be_clickable(
                (By.CLASS_NAME, "task-item-download")))
        download.click()
        
if __name__ == '__main__':
    image_one = Path('./Ишим-Волково до 16.10.18.JPG')
    image_two = Path('../route_1.jpg')

    if image_one.exists():
        recognise(image_one.resolve().as_posix(), True)
    elif image_two.exists():
        recognise(image_two.resolve().as_posix(), True)
    else:
        print("File doesn't exist =(")
