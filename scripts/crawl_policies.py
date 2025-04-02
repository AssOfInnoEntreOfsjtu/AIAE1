import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
import random

def get_headers():
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

def crawl_tech_policies():
    policies = []
    
    # 科技部政策
    try:
        url = 'http://www.most.gov.cn/zwgk/zcjd/'
        response = requests.get(url, headers=get_headers())
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for item in soup.select('.news_list li')[:10]:
            title = item.select_one('a').text.strip()
            link = 'http://www.most.gov.cn' + item.select_one('a')['href']
            date = item.select_one('.date').text.strip()
            
            if '人工智能' in title or 'AI' in title or '创业' in title:
                policies.append({
                    'title': title,
                    'date': date,
                    'link': link,
                    'source': '科技部',
                    'type': 'support' if '人工智能' in title or 'AI' in title else 'subsidy'
                })
    except Exception as e:
        print(f"Error crawling MOST: {e}")

    # 发改委政策
    try:
        url = 'https://www.ndrc.gov.cn/xxgk/zcfb/'
        response = requests.get(url, headers=get_headers())
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for item in soup.select('.u-list li')[:10]:
            title = item.select_one('a').text.strip()
            link = 'https://www.ndrc.gov.cn' + item.select_one('a')['href']
            date = item.select_one('.time').text.strip()
            
            if '人工智能' in title or 'AI' in title or '创业' in title:
                policies.append({
                    'title': title,
                    'date': date,
                    'link': link,
                    'source': '发改委',
                    'type': 'support' if '人工智能' in title or 'AI' in title else 'subsidy'
                })
    except Exception as e:
        print(f"Error crawling NDRC: {e}")

    # 工信部政策
    try:
        url = 'https://www.miit.gov.cn/zwgk/zcwj/'
        response = requests.get(url, headers=get_headers())
        soup = BeautifulSoup(response.text, 'html.parser')
        
        for item in soup.select('.list li')[:10]:
            title = item.select_one('a').text.strip()
            link = 'https://www.miit.gov.cn' + item.select_one('a')['href']
            date = item.select_one('.time').text.strip()
            
            if '人工智能' in title or 'AI' in title or '创业' in title:
                policies.append({
                    'title': title,
                    'date': date,
                    'link': link,
                    'source': '工信部',
                    'type': 'support' if '人工智能' in title or 'AI' in title else 'subsidy'
                })
    except Exception as e:
        print(f"Error crawling MIIT: {e}")

    return policies

def save_policies(policies):
    # 生成唯一文件名
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'policies_{timestamp}.json'
    
    # 保存为JSON文件
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(policies, f, ensure_ascii=False, indent=2)
    
    print(f"Policies saved to {filename}")

def main():
    print("开始爬取政策信息...")
    policies = crawl_tech_policies()
    print(f"共获取到 {len(policies)} 条政策信息")
    save_policies(policies)
    print("爬取完成！")

if __name__ == '__main__':
    main() 