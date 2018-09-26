from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


def init_driver():
    options = webdriver.firefox.options.Options()
    options.set_headless(headless=True)
    driver = webdriver.Firefox(firefox_options=options)
    driver.wait = WebDriverWait(driver, 20)
    return driver

def get_text(driver, class_name):
    return [
        el.text if el.text else None
            for el in driver.find_elements_by_class_name(class_name)
    ]

def parse(depart, dest):
    '''
    returns list of tuples with signature:
        'city1', 'city2', 'street1', 'street2', 'Type', 'Weight', 'Dimensions', 'Distance'
    '''
    link = 'http://loads.ati.su/'

    try:
        driver = init_driver()
        driver.get(link)
    except TimeoutException:
        print('Connection is broken')
        
    box_from = driver.wait.until(EC.presence_of_element_located(
            (By.ID, "from")))
    box_from.send_keys(depart)
    
    box_to = driver.wait.until(EC.presence_of_element_located(
            (By.ID, "to")))
    box_to.send_keys(dest)
    
    button = driver.wait.until(EC.element_to_be_clickable(
            (By.CLASS_NAME, "ati-button-group")))
    
    button.click()

    driver.wait.until(EC.presence_of_element_located(
            (By.CLASS_NAME, "search-found")))

    box_from = driver.wait.until(EC.presence_of_element_located(
            (By.ID, "from")))
    box_from.send_keys(depart)
    
    box_to = driver.wait.until(EC.presence_of_element_located(
            (By.ID, "to")))
    box_to.send_keys(dest)

    button = driver.wait.until(EC.element_to_be_clickable(
            (By.CLASS_NAME, "ati-button-group")))
    
    button.click()

    driver.wait.until(EC.presence_of_element_located(
            (By.CLASS_NAME, "search-found")))

    cities = get_text(driver, "load-main-city")
    streets = get_text(driver, "load-street")
    types = get_text(driver, "load-cargo-type")[1:]
    weights = get_text(driver, "load-weight")
    dimensions = get_text(driver, "load-dimensions")
    distance = get_text(driver, "route-distance") # todo add href
        
    driver.quit()

    names = ['city1', 'city2', 'street1', 'street2', 'Type', 'Weight', 'Dimensions', 'Distance']
    
    return list(zip(cities[0::2], cities[1::2], streets[0::2], streets[1::2], types, weights, dimensions, distance))
     
if __name__ == '__main__':
    print(
        parse(u"Центральный федеральный округ", u"Южный федеральный округ")
    )
