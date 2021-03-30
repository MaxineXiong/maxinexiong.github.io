from flask import Flask, render_template, request

import csv

app = Flask(__name__)

#@app.route('/index.html')
#def home():
    #return render_template('index.html')

#@app.route('/about.html')
#def about():
    #return render_template('about.html')

#@app.route('/contact.html')
#def contact():
    #return render_template('contact.html')

#@app.route('/projects.html')
#def work():
    #return render_template('projects.html')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(page_name)

@app.route('/thankyou.html', methods = ['POST', 'GET'])
def thank_page():
    if request.method == 'POST':

        try:
            data = request.form.to_dict()      #request.form returns a list of tuples of form data #to_dict(): turn to dictionary

            #append into .txt file
            txtfile = open('contactdata.txt', 'a')
            txtfile.write(data['name'] + ',' + data['email'] + ',' + data['message'] + '\n')

            #append into .csv file
            csvfile = open('contactdata.csv', 'a')
            csvfile_writer = csv.writer(csvfile, delimiter = ',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
            csvfile_writer.writerow([data['name'], data['email'], data['message']]) # pass a list to .writerow() function

            return render_template('thankyou.html', visitor = data['name'])

        except:
            return 'Did not save to database...'

    else:
        return 'Opps! Looks like something went wrong. Refresh the page or try again!'


if __name__ == '__main__':
    app.run(debug = True)
