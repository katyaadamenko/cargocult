from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException


def init_driver():
    options = webdriver.firefox.options.Options()
    options.set_headless(headless=True)
    driver = webdriver.Firefox(firefox_options=options)
    # driver.wait = WebDriverWait(driver, 5)
    return driver

def get_text(driver, class_name):
    return [
        el.text if el.text else None
            for el in driver.find_elements_by_class_name(class_name)
    ]

def parse(depart, dest):
    link = 'http://loads.ati.su/#?filter={"exactFromGeos":true,"exactToGeos":true,"height":{"from":4},"width":{"from":2.55},"fromGeo":"2_73","from":"Северо-Западный фед.округ","to":"Центральный федеральный округ","fromList":{"id":"6f5e4ef8-e210-e311-b4ec-00259038ec34","type":2,"name":"Северо-Западный фед.округ"},"fromGeo_tmp":"2_73","toList":{"id":"ee634ef8-e210-e311-b4ec-00259038ec34","type":2,"name":"Центральный федеральный округ"},"toGeo_tmp":"2_290"}'

    try:
        driver = init_driver()
        driver.get(link)
    except TimeoutException:
        print('Connection is broken')

    cities = get_text(driver, "load-main-city")
    streets = get_text(driver, "load-street")
    types = get_text(driver, "load-cargo-type")[1:]
    weights = get_text(driver, "load-weight")
    dimensions = get_text(driver, "load-dimensions")
    distance = get_text(driver, "route-distance") # todo add href
        
    driver.quit()
    
    return list(zip(cities[0::2], cities[1::2], streets[0::2], streets[1::2], types, weights, dimensions, distance))

if __name__ == '__main__':
    print(
        parse('', '')
    )
