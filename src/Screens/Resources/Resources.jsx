import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styles from './Resources.module.css'
import ITSlabs from './../../assets/it slabs.PNG'
const Resources = () => {
    return <>
    <Sidebar/><Navbar/>
    <div className={styles.screenContainer}>
        <div className={styles.container}>
            <section>
            <h2>FD</h2>
            <p>A fixed deposit is a type of term investment offered by several banks and NBFCs. These deposits typically offer a higher rate of interest, subject to certain terms and conditions. The amount you deposit in these deposits is locked for a predetermined period which can vary between 7 days and 10 years.</p>
            <p>Unlike market-linked investment options, such as stocks, a fixed deposit is not affected by market volatility. This means that the FD interest rates do not fluctuate and will remain stable throughout its tenure. The returns that you will receive after the fixed deposit matures are assured, which makes it easy to plan your financial goals.</p>
            <p>This is another benefit that fixed deposit investors can take advantage of. If you have a fixed deposit, you can always apply for a loan against your FD. The loan amount offered varies depending on the bank but you can avail of instant funds without disturbing your FD.</p>
            <p>The fixed deposit calculator for compound interest FD uses the following formula –</p>

            <p>M = P * (1 + r/100) ^ t, where –</p>
            <ul>
            <li>P is the principal amount that you deposit</li>
            <li>r is the rate of interest per annum</li>
            <li>t is the tenure in years</li>
            </ul>
            </section>
        </div>
        <div className={styles.container}>
            <section>
            <h2>RD</h2>
            <p>Recurring deposits (RDs) are an investment instrument almost similar to fixed deposits. However, you have to make fixed monthly deposits in RDs, unlike a lump sum amount in FDs. RDs create a habit of regular investment among earning individuals. These also instil discipline when it comes to savings. Recurring deposits are offered by the majority of banks and financial institutions.</p>
            <p>Among the low-risk investment tools with moderate and assured returns, Recurring Deposit (RD) is a popular investment option in India. It comes with an option of flexibility for customers in the choice of investment amount and tenure accompanied by multiple other benefits.</p>

            <p>Available in flexible tenure options ranging from 6 months to 10 years, this investment tool offered by multiple banks and NBFCs helps channelize monthly savings for long or short-term corpus creation.</p>
            <p>Almost all banks in the country along with several other institutions offer Recurring Deposit investment options. The interest rates are, thus, highly competitive. Depending on the prevalent market trends at the time of account creation, the interest rates may vary anywhere between 5% and 8%. The average interest rates, however, hover around 6% to 7% for most banks.</p>
            <p>The recurrent deposit calculator uses the following formula –</p>

            <p>A = P * (1 + r/(100 * n))^((n * t * 12)/12)</p>
            <p>....</p>
            <p>calculated for every month and sum of series is taken</p>
            <ul>
            <li>P is the RD installment each month</li>
            <li>r is the rate of interest per annum</li>
            <li>t is the tenure in years</li>
            <li>n is the compounding frequency</li>
            <li>A is the maturity amount</li>
            </ul>
            </section>
        </div>
        <div className={styles.container}>
            <section>
            <h2>SIP</h2>
            <p>A SIP is a systematic approach to investing and involves allocating a small pre-determined amount of money for investment in the market at regular intervals (usually every month). The SIP route is the preferred way of investing in stocks and Mutual Funds because it allows you to participate in the market while managing risk better.</p>
            <p>SIPs work on the following two principles-</p>

            <p><b>Rupee Cost Averaging</b></p>

            <p>SIPs can help you escape market volatility by eliminating the guessing game of market performance. Regular investing ensures that the average purchase cost is evened out in the long run.</p>

            <p>When the markets rise, you get fewer units, and when the markets fall, you receive more units. This minimizes your risk and ensures you acquire investments at a lower average cost per unit.</p>
            <p><b>Compounding</b></p>

            <p>Saving a small sum of money regularly for long periods of time can have an exponential impact on your investment because of the effect of compounding.</p>
            <p>The SIP calculator uses the following formula –</p>

            <p> A = P * (((1 + mi) ^ (12*t) - 1) / mi) * (1 + mi)</p>
           
            <ul>
            <li>P is the amount you invest at regular intervals</li>
            <li>mi is the monthly rate of interest</li>
            <li>t is the tenure in years</li>
            <li>A is the maturity amount</li>
            </ul>
            </section>
        </div>
        <div className={styles.container}>
            <section>
            <h2>ELSS</h2>
            <p>The ELSS or equity-linked savings scheme is the open-ended equity mutual fund that offers tax deduction under the base of Section 80C of the Income Tax Act, 1961. The mutual fund schemes here are equity-oriented and the only kind of mutual funds that come with tax benefits of Rs. 1,50,000 a year. While investing in ELSS, you could save Rs. 46,800 an annum in taxes.</p>
            <p>The portfolio of an ELSS is spread across equity-linked securities of companies across market cap and sectors. A portion of the portfolio is also invested in fixed-income securities. Investing in ELSS gives you the benefit of exposure to a diversified portfolio.</p>
            <p>Some of the feature of ELSS mutual funds includes:</p>
            <ul>
            <li>Lock-in period: It comes with a minimum lock-in period of 3 years.</li>
            <li>Equity exposure: It invests at least 80% of the investment in equities.</li>
            <li>Tax saving: Investments in ELSS are eligible for tax deduction under section 80C, upto Rs 1.5 lakh.</li>
            <li>Market-linked returns: It offers you market-linked returns, and the performance depends on the performance of the underlying equities in the portfolio.</li>
            <li>Diversified Portfolio: ELSS funds typically invest in diverse equities from various sectors, thereby decreasing concentration risks.</li>
            </ul>
            <p>The ELSS calculator uses the following formula –</p>

            <p>FV = C(1+r)^t – where</p>
            <ul>
            <li>FV = Future Value</li>
            <li>C = Investment</li>
            <li>r = expected rate of return</li>
            <li>t = time horizon of investment</li>
            </ul>
            </section>
        </div>
        <div className={styles.container}>
            <section>
                <h2>Income tax</h2>
                <p>In India, the Income Tax applies to individuals based on a slab system, where different tax rates are assigned to different income ranges. As the person's income increases, the tax rates also increase. This type of taxation allows for a fair and progressive tax system in the country. The income tax slabs are revised periodically, typically during each budget.</p>
                <p>the tax rates in the New tax regime is the same for all categories of Individuals, i.e. Individuals, Senior citizens and Super senior citizens</p>
                <img className={styles.table} src={ITSlabs} alt="IT Slabs"/>
                <p>Surcharge: In case the income exceeds a certain threshold, surcharge will be applicable
                Surcharge rates are as below:</p>
                <ul>
                <li>10% of Income tax if total income &gt; Rs.50 lakh</li>
                <li>15% of Income tax if total income &gt; Rs.1 crore</li>
                <li>25% of Income tax if total income &gt; Rs.2 crore</li>
                <li>37% of Income tax if total income &gt; Rs.5 crore</li>            
                </ul>
                <p>*In Budget 2023, the highest surcharge rate of 37% has been reduced to 25% under the new tax regime. (applicable from 1st April 2023)</p>
                <p>Additional Health and Education cess at the rate of 4% will be added to the income tax liability + surcharge in all cases</p>
            </section>
        </div>
        <div className={styles.container}>
            <section>
                <h2>PPF</h2>
                <p>The PPF account or Public Provident Fund scheme is one of the most popular long-term saving-cum-investment products, mainly due to its combination of safety, returns and tax savings.</p>
                <p>The PPF was first offered to the public in the year 1968 by the Finance Ministry’s National Savings Institute.  Since then it has emerged as a powerful tool to create long-term wealth for investors.</p>
                <p>Investors use the PPF as a tool to build a corpus for their retirement by putting aside sums of money regularly, over long periods of time (PPF has a 15-year maturity, and the facility to extend the tenure). With its attractive interest rates and tax benefits, the PPF is a big favourite with a small saver.</p>
                <p>The PPF is popular because it is one of the safest investment products. i.e., the government of India guarantees your investments in the fund. The interest rate is set by the government every quarter. PPF scores over many other investment options mainly because your investment is tax exempt under section 80C of the Income Tax Act (ITA) and the returns from PPF are also not taxable.</p>
                <p>The PPF calculator uses the following formula –</p>

            <p> A = P * (((1+(R/100) ^ t) - 1)/(R/100)) * (1 + R/100) - where,</p>
           
            <ul>
            <li>P is the annual installments</li>
            <li>R is the rate of interest</li>
            <li>t is the tenure in years</li>
            <li>A is the maturity amount</li>
            </ul>
            </section>
        </div>  
        <div className={styles.container}>
            <section>
                <h2>NPS</h2>
                <p>The National Pension System or NPS is a measure to introduce a degree of financial stability for Indian citizens after they have retired. It was previously known as the National Pension Scheme. Anyone over the age of 60 is eligible to use the amount gathered in the pension corpus. You will need an NPS calculator to determine how much the total accumulation amounts to.</p>
                <p>Any resident of the country who is between 18 and 60 years of age is eligible to build up a pension corpus. It is an investment and an asset after retirement. Since most people in India have private jobs with little security, they need a National Pension Scheme calculator. Pension schemes in the country are not market-linked instruments and earn sound returns.</p>
                <p>The NPS calculator uses the following formula –</p>

                <p> A = P (1 + r/n) ^ nt - where,</p>
            
                <ul>
                <li>P is the principal sum</li>
                <li>R is the rate of interest per annum</li>
                <li>n is the number of times interest compounds</li>
                <li>t is the tenure in years</li>
                <li>A is the maturity amount</li>
                </ul>
            </section>
        </div>      
        <div className={styles.container}>
            <section>
                <h2>EPF</h2>
                <p>Most private sector employees are entitled to receive post-retirement benefits if they function in the organised sector. Note that government employees are additionally eligible for pensions unlike their private sector counterparts. Employee Provident Fund was set up after the EPF Act was passed in the Parliament. Under the law, the Employees Provident Fund Organisation of India (or EFPO) controls the funds deposited by both the employee and employer in a permanent account, affixed by an UAN or Unique Account Number.</p>
                <p>Every month, an employee must contribute 12% of their basic and dearness allowance to EPF. The employer contributes the same amount and matches this payment. Out of the 12%, 8.33% is directed towards Employee Pension Scheme and 3.67% to EPF. However, the employee's total contribution of 12% goes towards EPF.</p>
                <p>When you retire, you can withdraw a lump sum from EPF. Because the Government of India manages the EPF and guarantees a return, it is one of the most preferred retirement savings schemes. The rate of interest on the contribution is decided by the EPFO and can vary on an annual basis.</p>
            </section>
        </div>
        <div className={styles.container}>
            <section>
                <h2>OPS</h2>
                <p>The Old Pension Scheme (OPS) is a retirement scheme approved by the government. Government employees receive a monthly pension under the OPS. It provides a guaranteed pension for government employees who have completed at least ten years of service based on their last drawn basic salary and the years of service.</p>
                <p>Under the OPS, the government pays the entire pension amount to government employees after retirement. Thus, no amount is deducted from employees’ salaries when they are in service.</p>
                <p>After retirement, government employees receive the pension amount and the benefit of the revision of Dearness Allowance (DA) twice a year. Since they receive pensions based on their last drawn salary plus DA, their pensions increase when the DA increases twice a year. However, OPS applies only to government employees. </p>
                <p>It assures life-long income post-retirement.
Employees get a pension under a predetermined formula, i.e. 50% of the last drawn basic salary plus DA or the average earnings in the last ten months of service, whichever is more.
Employee’s pension increases with the revision of DA twice a year.</p>
            </section>
        </div>
    </div>
    </>
}

export default Resources;