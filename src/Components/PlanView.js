import React, { Component } from "react";
import decodeToken from "../Auth/authUtil";
import { chunk } from "lodash";

import Select from "react-select";

const mockData = {
	name: "MealPlan 1555140309008",
	publishAsPublic: true,
	items: [
		{
			day: 1,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":658803,"imageType":"jpg","title":"Rosemary Rum Raisin Soda Bread with Pecans"}'
		},
		{
			day: 1,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value: '{"id":633754,"imageType":"jpg","title":"Baked Ratatouille"}'
		},
		{
			day: 1,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":649850,"imageType":"jpg","title":"Lemon-Pepper Fettucine Alfredo"}'
		},
		{
			day: 2,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value: '{"id":636087,"imageType":"jpg","title":"Breakfast: Waffles"}'
		},
		{
			day: 2,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":782619,"imageType":"png","title":"Mushroom Goat Cheese Baked Eggs"}'
		},
		{
			day: 2,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":633824,"imageType":"jpg","title":"Baked Stuffed Potatoes (Tandoori Potatoes)"}'
		},
		{
			day: 3,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":635649,"imageType":"jpg","title":"Bon \\u201cApple\\u201d Tite Cinnamon Rolls"}'
		},
		{
			day: 3,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":633744,"imageType":"jpg","title":"Baked Potatoes with Creamy Mushroom Ragout"}'
		},
		{
			day: 3,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":635217,"imageType":"jpg","title":"Blackberry Grilled Cheese Sandwich"}'
		},
		{
			day: 4,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":636588,"imageType":"jpg","title":"Butternut Squash French Toast"}'
		},
		{
			day: 4,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":658743,"imageType":"jpg","title":"Roll Up Eggplant Lasagna"}'
		},
		{
			day: 4,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":664967,"imageType":"png","title":"Warm Open-Faced Mushroom Brie Sandwich"}'
		},
		{
			day: 5,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":648006,"imageType":"jpg","title":"Irish Soda Bread By Mommie Cooks"}'
		},
		{
			day: 5,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value: '{"id":648470,"imageType":"jpg","title":"Japanese Curry Puffs"}'
		},
		{
			day: 5,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":157272,"imageType":"jpg","title":"Pomegranate-Nutella Waffles"}'
		},
		{
			day: 6,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":655239,"imageType":"jpg","title":"Peanut Butter Banana French Toast"}'
		},
		{
			day: 6,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value: '{"id":652919,"imageType":"jpg","title":"Nachos Grande"}'
		},
		{
			day: 6,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value: '{"id":617047,"imageType":"jpg","title":"Rasmalai "}'
		},
		{
			day: 7,
			mealPlanId: 0,
			slot: 1,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":655786,"imageType":"jpg","title":"Persimmons Pumpkin Orange Smoothie With Chia Seeds"}'
		},
		{
			day: 7,
			mealPlanId: 0,
			slot: 2,
			position: 0,
			type: "RECIPE",
			value: '{"id":640234,"imageType":"jpg","title":"Couscous Biryani"}'
		},
		{
			day: 7,
			mealPlanId: 0,
			slot: 3,
			position: 0,
			type: "RECIPE",
			value:
				'{"id":632108,"imageType":"jpg","title":"Almond Cake With Orange Marmalade"}'
		}
	]
};

const options = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];

export default class PlanView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				weight: "",
				height: "",
				age: "",
				dietType: "",
				exclusions: ""
			},

			userId: "",
			metric: {},
			saving: false
		};
	}

	componentDidMount = () => {
		const userToken = decodeToken(localStorage.getItem("token"));
		const userEmailAddress = userToken.emailAddress;

		const getUserMetricsURL = `http://localhost:5000/self/metric?userId=${userEmailAddress}`;

		// get user metrics
		fetch(getUserMetricsURL)
			.then(function(res) {
				return res.json();
			})
			.then(json => {
				if (json.metric) {
					const { age, height, weight, userId, dietType } = json.metric;

					this.setState({
						userId,
						form: {
							...this.state.form,
							age,
							height,
							weight,
							dietType
						},
						metric: json.metric
					});
				}
			});

		// if no metrics, display empty form

		// else preload values

		// TODO: calculate calories
		// const bmi = body.weight / Math.pow(body.height / 100, 2);

		const calories = 2000;

		// get meal plan
		this.getMealPlan(calories);
	};

	getMealPlan = calories => {
		// const timeFrame = "week";
		// const targetCalories = calories;
		// const dietType = "vegetarian";

		// const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${dietType}&exclude=shellfish%2C+olives`;

		// const headers = {
		// 	"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		// 	"X-RapidAPI-Key": "l4oSpayaRImshfMIxVnXttpcS8EDp1knCc4jsndVAzNcSg0Pv4"
		// };

		// fetch(url, { headers })
		// 	.then(function(res) {
		// 		return res.json();
		// 	})
		// 	.then(function(json) {
		// 		console.log("plan", json);
		// 	});

		return mockData;
	};

	handleInputChange = e => {
		// console.log(e.target.value, e.target.name);

		let fieldChanged = e.target.name;
		this.setState({
			form: {
				...this.state.form,
				[fieldChanged]: e.target.value
			}
		});
	};

	onMultiSelectChange = e => {
		console.log(e);
		this.setState({
			form: {
				...this.state.form,
				exclusions: e.map(e => e.value).join(",")
			}
		});
	};

	onSelectChange = e => {
		console.log(e);
		this.setState({
			form: {
				...this.state.form,
				dietType: e.value
			}
		});
	};

	handleOnSave = e => {
		const userToken = decodeToken(localStorage.getItem("token"));
		const userEmailAddress = userToken.emailAddress;

		const saveUserMetricsURL = `http://localhost:5000/self/metric`;

		const form = this.state.form;

		form.userId = userEmailAddress;

		console.log("FORM IS", form);

		// get user metrics
		fetch(saveUserMetricsURL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(form)
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => console.log("ERR at save ", err));
	};

	render() {
		let saveButton;
		if (!this.state.saving) {
			saveButton = (
				<button
					type="submit"
					className="CreateFoodView__submit-button"
					onClick={this.handleOnSave}
				>
					Save
				</button>
			);
		} else {
			saveButton = (
				<button type="submit" className="CreateFoodView__submit-button saving">
					Saving...
				</button>
			);
		}

		return (
			<div className="content-container">
				<h1 className="page-title">Your Diet Plan</h1>
				<div className="MyGoals">
					<form className="MyGoals__form" onSubmit={this.handleSubmit}>
						{/* weight */}
						<span className="MyGoals__form--input">
							<label htmlFor="calories">Weight</label>
							<input
								type="text"
								name="weight"
								placeholder="kg"
								value={this.state.form.weight}
								onChange={this.handleInputChange}
							/>
						</span>

						{/* height */}
						<span className="MyGoals__form--input">
							<label htmlFor="height">Height</label>
							<input
								type="text"
								name="height"
								placeholder="cm"
								value={this.state.form.height}
								onChange={this.handleInputChange}
							/>
						</span>

						{/* age */}
						<span className="MyGoals__form--input">
							<label htmlFor="age">Age</label>
							<input
								type="text"
								name="age"
								placeholder="years"
								value={this.state.form.age}
								onChange={this.handleInputChange}
							/>
						</span>

						{saveButton}
					</form>

					<br />

					<div>
						<label htmlFor="exclusions">Exclusions</label>
						<Select
							onChange={this.onMultiSelectChange}
							defaultValue={[]}
							isMulti
							name="exclusions"
							options={options}
							className="basic-multi-select"
							classNamePrefix="select"
						/>
					</div>

					<br />

					<div>
						<label htmlFor="veg">Diet Type</label>
						<Select
							onChange={this.onSelectChange}
							defaultValue={this.state.form.dietType}
							name="veg"
							options={[
								{
									value: "veg",
									label: "Vegan"
								},
								{
									value: "all",
									label: "All"
								}
							]}
							className="basic-multi-select"
							classNamePrefix="select"
						/>
					</div>

					<br />

					<br />

					<hr />

					{this.state.userId && (
						<table>
							<tbody>
								<tr>
									<th>Monday</th>
									<th>Tuesday</th>
									<th>Wednesday</th>
									<th>Thursday</th>
									<th>Friday</th>
									<th>Saturday</th>
									<th>Sunday</th>
								</tr>
								{[0, 1, 2].map(e => (
									<tr key={e}>
										{chunk(mockData.items, 3).map((d, i) => {
											return <td key={i}>{JSON.parse(d[e].value).title}</td>;
										})}
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		);
	}
}
